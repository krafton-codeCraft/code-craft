package com.bknote71.codecraft.robocode.core;

import java.util.HashMap;
import java.util.Map;

public class RobotManager {

    public static RobotManager Instance = new RobotManager();

    private Object lock = new Object();
    private Map<Integer, RobotPeer> robots = new HashMap<>();

    private int id;

    public RobotPeer add() {
        synchronized (lock) {
            int robotId = ++id;
            RobotPeer robotPeer = new RobotPeer(robotId);
            robots.put(robotId, robotPeer);
            return robotPeer;
        }
    }

    public void remove(int robotId) {
        synchronized (lock) {
            RobotPeer removedRobot = robots.remove(robotId);
            if (removedRobot == null)
                return;

            removedRobot.cleanup();
        }
    }
}
