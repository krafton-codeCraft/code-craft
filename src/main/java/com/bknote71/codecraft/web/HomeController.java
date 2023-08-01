package com.bknote71.codecraft.web;

import com.bknote71.codecraft.robocode.leaderboard.LeaderBoardInfo;
import com.bknote71.codecraft.robocode.leaderboard.LeaderBoardTemplate;
import com.bknote71.codecraft.robocode.loader.AwsS3ClassLoader;
import com.bknote71.codecraft.robocode.loader.CompileResult;
import com.bknote71.codecraft.session.packet.PacketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class HomeController {

    private final PacketHandler packetHandler;

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @PostMapping("/create/robot")
    @ResponseBody
    public ResponseEntity<?> createRobot(String username, String code) { // author == username
        CompileResult result = AwsS3ClassLoader.Instance.createRobot(username, code);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/change/robot")
    @ResponseBody
    public ResponseEntity<?> changeRobotInBattle(@AuthenticationPrincipal(expression = "username") String username,
            int robotId, int specIndex, String code) { // author == username
        CompileResult result = AwsS3ClassLoader.Instance.createRobot(username, code);
        if (result.exitCode != 0)
            return new ResponseEntity<>(result, HttpStatus.OK);

        // 컴파일에 성공하면 신호를 줘야함
        packetHandler.changeRobotSpec(username, robotId, specIndex, result.robotName, result.fullClassName);

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
