package com.bknote71.codecraft.robocode.sample;
import com.bknote71.codecraft.robocode.api.Robot;
import com.bknote71.codecraft.robocode.event.ScannedRobotEvent;
import com.bknote71.codecraft.robocode.event.HitByBulletEvent;
public class Star2Bot extends Robot {
    @Override
    public void run() {
        while (true) {
            ahead(300);
            turnRight(144);
        }
    }
}
