package com.bknote71.basicwebsocketrobocode.robocode.sample;
import com.bknote71.basicwebsocketrobocode.robocode.api.Robot;
import com.bknote71.basicwebsocketrobocode.robocode.event.ScannedRobotEvent;
import com.bknote71.basicwebsocketrobocode.robocode.event.HitByBulletEvent;
public class StupidBot extends Robot {

    @Override
    public void run() {
        while (true) {
            System.out.println(Thread.currentThread().getName() + " 헤헤헤헤: " + getX() + ", " + getY());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void onScannedRobot(ScannedRobotEvent event) {
        System.out.println("헤헤헤헤헤 스캔: " + event.getName());
    }
}

