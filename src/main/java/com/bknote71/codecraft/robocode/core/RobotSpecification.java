package com.bknote71.codecraft.robocode.core;


public class RobotSpecification {

    private final String name; // bucket 의 key
    private final String username; // owner
    private final String fullClassName; // MyRobot.class (or MyRobot.java) in s3

    public RobotSpecification(String name, String username, String fullClassName) {
        this.name = name;
        this.username = username;
        this.fullClassName = fullClassName;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getFullClassName() {
        return fullClassName;
    }

    public boolean isPaintRobot() {
        return false;
    }

    public String getShortClassName() {
        return null;
    }

}
