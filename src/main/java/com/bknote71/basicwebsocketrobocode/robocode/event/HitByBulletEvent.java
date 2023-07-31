package com.bknote71.basicwebsocketrobocode.robocode.event;


import com.bknote71.basicwebsocketrobocode.robocode.api.Bullet;
import com.bknote71.basicwebsocketrobocode.robocode.api.Robot;
import com.bknote71.basicwebsocketrobocode.robocode.core.RobotStatics;
import com.bknote71.basicwebsocketrobocode.robocode.robointerface.IBasicEvent;

public class HitByBulletEvent extends Event {

    private final static int DEFAULT_PRIORITY = 20;

    private double bearing; // 총알 회전 각도?
    private Bullet bullet;

    public HitByBulletEvent(double bearing, Bullet bullet) {
        super();
        this.bearing = bearing;
        this.bullet = bullet;
    }

    public double getBearing() {
        return bearing * 180.0 / Math.PI;
    }

    public double getBearingRadians() {
        return bearing;
    }

    public Bullet getBullet() {
        return bullet;
    }

    public double getHeading() {
        return bullet.getHeading();
    }

    public double getPower() {
        return bullet.getPower();
    }

    public double getVelocity() {
        return bullet.getVelocity();
    }

    int getDefaultPriority() {
        return DEFAULT_PRIORITY;
    }

    @Override
    public void dispatch(Robot robot, RobotStatics statics) {
        IBasicEvent listener = robot.getBasicEvent();
        if (listener != null)
            listener.onHitByBullet(this);
    }
}
