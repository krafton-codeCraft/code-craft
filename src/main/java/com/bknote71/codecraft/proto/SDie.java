package com.bknote71.codecraft.proto;


public class SDie extends Protocol {

    private int id;

    public SDie() {
        super(ProtocolType.S_Die);
    }

    public void setId(int id) {
        this.id = id;
    }
}
