package com.bknote71.basicwebsocketrobocode.proto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

@JsonTypeName("centerbattle")
@Data
public class CEnterBattle extends Protocol {
    private String username;

    public CEnterBattle() {
        super(ProtocolType.C_EnterBattle);
    }
}
