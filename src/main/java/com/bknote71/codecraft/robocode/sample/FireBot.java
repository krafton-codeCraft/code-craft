package com.bknote71.codecraft.robocode.sample;

import com.bknote71.codecraft.robocode.api.Robot;
import com.bknote71.codecraft.robocode.event.ScannedRobotEvent;

public class FireBot extends Robot {
    @Override
    public void run() {
        while (true) {
            // 총알 커맨드: fire == fireBullet
            // 15 도 씩 돌기
            turnLeft(15);
            // scan();

            System.out.println(Thread.currentThread().getName() + "스레드에서의 각도: " + getGunHeading());
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void onScannedRobot(ScannedRobotEvent event) {
        System.out.println("스캐닝 성공! 대상: " + event.getName());
        System.out.println("총쏘기");
        fire(1);
    }
}
