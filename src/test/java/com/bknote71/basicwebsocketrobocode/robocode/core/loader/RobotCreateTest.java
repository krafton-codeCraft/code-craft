package com.bknote71.basicwebsocketrobocode.robocode.core.loader;

import com.bknote71.codecraft.robocode.loader.AwsS3ClassLoader;
import com.bknote71.codecraft.robocode.loader.CompileResult;
import org.junit.jupiter.api.Test;

public class RobotCreateTest {

    @Test
    void star2() {
        String author = "user5";
        String content =
                "public class Star2Bot extends Robot {\n" +
                "    @Override\n" +
                "    public void run() {\n" +
                "        while (true) {\n" +
                "            ahead(300);\n" +
                "            turnRight(144);\n" +
                "        }\n" +
                "    }\n" +
                "}";

        AwsS3ClassLoader classLoader = new AwsS3ClassLoader("robot-class");
        CompileResult result = classLoader.createRobot(author, content);
        System.out.println(result.content);
    }
}
