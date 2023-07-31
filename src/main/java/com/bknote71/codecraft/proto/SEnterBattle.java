package com.bknote71.codecraft.proto;

import com.bknote71.codecraft.robocode.core.RobotSpecification;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;


@JsonTypeName("senterbattle")
@Data
public class SEnterBattle extends Protocol {

    private int robotId;
    private int specIndex;
    private String robotName;
    private RobotSpecification[] specifications;
    private String username;

    public SEnterBattle() {
        super(ProtocolType.S_EnterBattle);
    }
}
