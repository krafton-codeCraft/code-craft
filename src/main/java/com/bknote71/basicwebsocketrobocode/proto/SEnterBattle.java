package com.bknote71.basicwebsocketrobocode.proto;

import com.bknote71.basicwebsocketrobocode.robocode.core.RobotSpecification;
import lombok.Data;

@Data
public class SEnterBattle extends Protocol {

    private RobotSpecification[] specifications;

    public SEnterBattle() {
        super(ProtocolType.S_EnterBattle);
    }

    public void setSpecifications(RobotSpecification[] specifications) {
        this.specifications = specifications;
    }
}
