package com.bknote71.codecraft.proto;


import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

@JsonTypeName("sdie")
public class SDie extends Protocol {

    private int id;

    public SDie() {
        super(ProtocolType.S_Die);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
