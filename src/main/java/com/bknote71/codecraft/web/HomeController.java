package com.bknote71.codecraft.web;

import com.bknote71.codecraft.entity.service.RobotSpecService;
import com.bknote71.codecraft.robocode.leaderboard.LeaderBoardInfo;
import com.bknote71.codecraft.robocode.leaderboard.LeaderBoardTemplate;
import com.bknote71.codecraft.robocode.loader.AwsS3ClassLoader;
import com.bknote71.codecraft.robocode.loader.CompileResult;
import com.bknote71.codecraft.session.packet.PacketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
public class HomeController {

    private final PacketHandler packetHandler;
    private final RobotSpecService robotSpecService;

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/lobby")
    public String lobby() {
        return "lobby";
    }

    @GetMapping("/get/robot-infos")
    @ResponseBody
    public ResponseEntity<?> getRobotInfos(@AuthenticationPrincipal(expression = "username") String username) {
        List<RobotSpecDto> robotInfos = robotSpecService.getRobotInfo(username);
        System.out.println(username + " 응답성공 " + robotInfos.size());
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
            RobotSpecDto saveResult = robotSpecService.saveRobotSpec(username, specIndex, result.getRobotname(), result.getFullClassName(),
                    result.getCode());
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
    public ResponseEntity<?> changeRobotInBattle(@AuthenticationPrincipal(expression = "username") String username,
            int robotId, int specIndex, String code) { // author == username
        log.info("change robot {}", username);

        AwsS3ClassLoader classLoader = new AwsS3ClassLoader("robot-class");
        CompileResult result = classLoader.createRobot(username, code);

        if (result.exitCode == 0) {
            // 컴파일에 성공하면 신호를 줘야함
            RobotSpecDto changeResult = robotSpecService.changeRobotSpec(username, robotId, specIndex, result.robotname,
                    result.fullClassName, code);

            if (changeResult == null) {
                log.error("change robot spec failed");
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        result.username = username;

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/get/leaderboard")
    @ResponseBody
    public List<LeaderBoardInfo> getLeaderBoard(int roomId) {
        return LeaderBoardTemplate.getLeaderBoard(roomId);
    }

    @GetMapping("/get/today_ranking")
    @ResponseBody
    public List<LeaderBoardInfo> getTodayRanking() {
        LeaderBoardTemplate.union();
        return LeaderBoardTemplate.getTodayRanking();
    }

}
