package com.bknote71.codecraft.robocode;

import com.bknote71.codecraft.robocode.core.RobotPeer;
import com.bknote71.codecraft.robocode.core.battle.Battle;
import com.bknote71.codecraft.session.ClientSession;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Player {

    private int id;
    private String username;

    // session connection
    private ClientSession session;

    // ingame: main robot, sub robot
    private Map<Integer, RobotPeer> robots = new HashMap<>();
    private Battle battle;

    public void addRobot(RobotPeer robotPeer) {
        robotPeer.setPlayer(this);
        robots.put(robotPeer.getId(), robotPeer);
    }

    public void cleanup() {
        for (RobotPeer robotPeer : robots.values()) {
            robotPeer.cleanup();
        }
    }

}
