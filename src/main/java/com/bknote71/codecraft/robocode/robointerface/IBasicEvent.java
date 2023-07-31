package com.bknote71.codecraft.robocode.robointerface;

import com.bknote71.codecraft.robocode.event.HitByBulletEvent;
import com.bknote71.codecraft.robocode.event.ScannedRobotEvent;
import com.bknote71.codecraft.robocode.event.StatusEvent;

public interface IBasicEvent {
    void onStatus(StatusEvent statusEvent);

    void onHitByBullet(HitByBulletEvent hitByBulletEvent);

    void onScannedRobot(ScannedRobotEvent scannedRobotEvent);
}
