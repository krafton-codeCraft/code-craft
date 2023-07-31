package com.bknote71.basicwebsocketrobocode.robocode.core;


public class RobotSpecification {

    private final String name; // bucket 의 key
    private final String author; // owner
    private final String fullClassName; // MyRobot.class (or MyRobot.java) in s3

    public RobotSpecification(String name, String author, String fullClassName) {
        this.name = name;
        this.author = author;
        this.fullClassName = fullClassName;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
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
