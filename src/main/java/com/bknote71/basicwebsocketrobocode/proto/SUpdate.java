package com.bknote71.basicwebsocketrobocode.proto;

import lombok.Data;

public class SUpdate extends Protocol {
    private UpdateInfo update;

    public SUpdate() {
        super(ProtocolType.S_Update);
    }

    public void setUpdate(UpdateInfo update) {
        this.update = update;
    }
}
