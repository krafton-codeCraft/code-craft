package com.bknote71.basicwebsocketrobocode.robocode.event;


import com.bknote71.basicwebsocketrobocode.robocode.api.Robot;
import com.bknote71.basicwebsocketrobocode.robocode.core.RobotStatics;
import com.bknote71.basicwebsocketrobocode.robocode.core.RobotStatus;
import com.bknote71.basicwebsocketrobocode.robocode.robointerface.IBasicEvent;

public class StatusEvent extends Event {
    private final static int DEFAULT_PRIORITY = 99;

    private final RobotStatus status;

    public StatusEvent(RobotStatus status) {
        super();
        this.status = status;
    }

    public RobotStatus getStatus() {
        return status;
    }

    int getDefaultPriority() {
        return DEFAULT_PRIORITY;
    }

    @Override
    public final void dispatch(Robot robot, RobotStatics statics) {
        IBasicEvent listener = robot.getBasicEvent();

        if (listener != null) {
            listener.onStatus(this);
        }
    }
}
