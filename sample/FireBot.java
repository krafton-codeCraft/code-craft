package com.bknote71.codecraft.robocode.sample;
import com.bknote71.codecraft.robocode.api.Robot;
import com.bknote71.codecraft.robocode.event.ScannedRobotEvent;
import com.bknote71.codecraft.robocode.event.HitByBulletEvent;
public class FireBot extends Robot {
    @Override
    public void run() {
        while (true) {
<<<<<<< HEAD
            // 총알 커맨드: fire == fireBullet
            // 15 도 씩 돌기
            turnLeft(90);
            ahead(250);
            turnRight(90);
            ahead(250);
            // scan();
=======
            turnLeft(360);
>>>>>>> 468885226246c7008556dad87fe81a01ed6b1e63

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

