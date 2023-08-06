package com.bknote71.codecraft.web;

import com.bknote71.codecraft.entity.service.RobotSpecService;
import com.bknote71.codecraft.robocode.leaderboard.LeaderBoardInfo;
import com.bknote71.codecraft.robocode.leaderboard.LeaderBoardTemplate;
import com.bknote71.codecraft.robocode.loader.AwsS3ClassLoader;
import com.bknote71.codecraft.web.dto.CompileRequest;
import com.bknote71.codecraft.web.dto.CompileResult;
import com.bknote71.codecraft.session.packet.PacketHandler;
import com.bknote71.codecraft.web.dto.RobotSpecDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
public class HomeController {

    private final RobotSpecService robotSpecService;
    private final CodeConvertService convertJavaCode;

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/lobby")
    public String lobby(@AuthenticationPrincipal(expression = "username") String username,
                        Model model) {
        // 모델
        List<RobotSpecDto> robotInfos = robotSpecService.getRobotInfo(username);
        model.addAttribute("robotInfos", robotInfos);
        return "lobby";
    }

    @GetMapping("/ingame")
    public String ingame(@AuthenticationPrincipal(expression = "username") String username,
                         Model model,
                         int specIndex) {
        List<RobotSpecDto> robotInfos = robotSpecService.getRobotInfo(username);

        model.addAttribute("robotInfos", robotInfos);
        model.addAttribute("specIndex", specIndex < 1 ? 0 : specIndex - 1);
        return "ingame";
    }

    @GetMapping("/get/robot-infos")
    @ResponseBody
    public ResponseEntity<?> getRobotInfos(@AuthenticationPrincipal(expression = "username") String username) {
        List<RobotSpecDto> robotInfos = robotSpecService.getRobotInfo(username);
        return new ResponseEntity<>(robotInfos, HttpStatus.OK);
    }

    @PostMapping("/create/robot")
    @ResponseBody
    public ResponseEntity<?> createRobot(@AuthenticationPrincipal(expression = "username") String username,
                                         int specIndex, String code) { // author == username
        log.info("create robot {}", username);

        AwsS3ClassLoader classLoader = new AwsS3ClassLoader("robot-class");
        CompileResult result = classLoader.createRobot(username, code);

        if (result.exitCode == 0) {
            RobotSpecDto saveResult = robotSpecService.saveRobotSpec(username, specIndex, result.getRobotname(), result.getFullClassName(), code, "java");
            if (saveResult == null) {
                log.error("save robot spec failed");
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        result.username = username;

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/change/ingame-robot")
    @ResponseBody
    public ResponseEntity<?> compileRobot(@AuthenticationPrincipal(expression = "username") String username,
                                          CompileRequest compileRequest) { // author == username
        log.info("{} change robot, {}", username, compileRequest);
        // 먼저 비교
        Boolean compareResult = robotSpecService.compareWithRequestCode(username, compileRequest);
        if (compareResult == null) {
            log.error("compile 요청이 잘못됨");
            return null;
        }

        if (compareResult == true) {
            log.info("code가 같으므로 return 한다.");
            return new ResponseEntity<>(new CompileResult(0, "same code"), HttpStatus.OK);
        }

        String javaCode = compileRequest.getCode();
        String lang = compileRequest.getLang();
        if ((lang != null && !lang.isEmpty() && !lang.isBlank() && !lang.equals("undefined"))
                && compileRequest.getLang() != "java") {
            log.info("lang: {}", lang);
            javaCode = convertJavaCode.convertLangToJava(compileRequest.getLang(), compileRequest.getCode());
        }

        AwsS3ClassLoader classLoader = new AwsS3ClassLoader("robot-class");
        CompileResult result = classLoader.createRobot(username, javaCode);

        RobotSpecDto changeResult;
        if (result.exitCode == 0) {
            // 컴파일에 성공하면 신호를 줘야함
            changeResult = robotSpecService.changeRobotSpec(username, compileRequest, result.robotname,
                    result.fullClassName);

            if (changeResult == null) {
                log.error("change robot spec failed");
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        result.username = username;
        result.lang = lang;

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/convert-check")
    @ResponseBody
    public String convertCheck(String lang, String code) {
        log.info("server", lang, code);
        return convertJavaCode.convertLangToJava(lang, code);
    }
}
