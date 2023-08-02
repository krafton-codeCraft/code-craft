package com.bknote71.codecraft.robocode.sample;
com.bknote71.codecraft.robocode.sample
import com.bknote71.codecraft.robocode.event.ScannedRobotEvent;
import com.bknote71.codecraft.robocode.event.HitByBulletEvent;
public class FireBot extends Robot {
    @Override
    public void run() {
        while (true) {
            turnLeft(360);

            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void onScannedRobot(ScannedRobotEvent event) {
        System.out.println("scanning success target: " + event.getName());
        System.out.println("shooooooooooooooot");
        fire(1);
    }
}

