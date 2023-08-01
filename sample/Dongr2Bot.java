package com.bknote71.codecraft.robocode.sample;
import com.bknote71.codecraft.robocode.api.Robot;
import com.bknote71.codecraft.robocode.event.ScannedRobotEvent;
import com.bknote71.codecraft.robocode.event.HitByBulletEvent;
public class Dongr2Bot extends Robot {
    @Override
    public void run() {
        while (true) {
            turnLeft(30);
            ahead(200);
            try {
                Thread.sleep(150);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}

