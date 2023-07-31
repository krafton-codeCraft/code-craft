package com.bknote71.basicwebsocketrobocode.robocode.robointerface;

import com.bknote71.basicwebsocketrobocode.robocode.event.HitByBulletEvent;
import com.bknote71.basicwebsocketrobocode.robocode.event.ScannedRobotEvent;
import com.bknote71.basicwebsocketrobocode.robocode.event.StatusEvent;

public interface IBasicEvent {
    void onStatus(StatusEvent statusEvent);

    void onHitByBullet(HitByBulletEvent hitByBulletEvent);

    void onScannedRobot(ScannedRobotEvent scannedRobotEvent);
}
