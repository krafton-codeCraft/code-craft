package com.bknote71.codecraft.proto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

@JsonTypeName("supdate")
@Data
public class SUpdate extends Protocol {
    private UpdateInfo update;

    public SUpdate() {
        super(ProtocolType.S_Update);
    }
}
