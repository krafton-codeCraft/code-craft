package com.bknote71.codecraft.proto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

public class UpdateInfo {
    public long t;
    public List<RobotInfo> robots = new ArrayList<>();
    public List<BulletInfo> bullets = new ArrayList<>();
    public List<ScanInfo> scans = new ArrayList<>();

    @Data
    public static class RobotInfo {
        int id;
        String name;
        double robotX;
        double robotY;
        double bodyHeading;
        double gunHeading;
        double x;
        double y;

        public RobotInfo(int id, String name, double robotX, double robotY,
                         double bodyHeading, double gunHeading, double x, double y) {
            this.id = id;
            this.name = name;
            this.robotX = robotX;
            this.robotY = robotY;
            this.bodyHeading = bodyHeading;
            this.gunHeading = gunHeading;
            this.x = x;
            this.y = y;
        }
    }

    @Data
    public static class BulletInfo {
        double x;
        double y;

        public BulletInfo(double x, double y) {
            this.x = x;
            this.y = y;
        }
    }

    @Data
    public static class ScanInfo {
        // 시작 위치
        int id;
        String name;
        double robotX;
        double robotY;
        double angleStart;
        double angleExtent;
        double x;
        double y;
        double width;
        double height;

        public ScanInfo(int id, String name, double robotX, double robotY,
                        double angleStart, double angleExtent, double x, double y, double width, double height) {
            this.id = id;
            this.name = name;
            this.robotX = robotX;
            this.robotY = robotY;
            this.angleStart = angleStart;
            this.angleExtent = angleExtent;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

}
