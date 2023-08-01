package com.bknote71.basicwebsocketrobocode.robocode.core.loader;

// import com.bknote71.codecraft.robocode.loader.AwsS3ClassLoader;
// import com.bknote71.codecraft.robocode.loader.CompileResult;

import com.bknote71.codecraft.robocode.loader.AwsS3ClassLoader;
import com.bknote71.codecraft.robocode.loader.CompileResult;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

class AwsS3ClassLoaderTest {

    @Test
    void parse() {
        String name = "MyRobot.class";
        String[] split = name.split("\\.");
        System.out.println(Arrays.toString(split));
    }

//    @Test
//    void classLoadTest() throws ClassNotFoundException, InstantiationException, IllegalAccessException {
//        AwsS3ClassLoader load = new AwsS3ClassLoader("robot-class");
//        Class<?> myRobot = load.loadClass("FireBot.class");
//        Robot myRobot1 = (Robot) myRobot.newInstance();
//        myRobot1.pyosik();
//    }

    @Test
    void compileFireBot() {
        String author = "sa";
        String content =
                "public class FireBot extends Robot {\n" +
                        "    @Override\n" +
                        "    public void run() {\n" +
                        "        while (true) {\n" +
                        "            // 총알 커맨드: fire == fireBullet\n" +
                        "            // 15 도 씩 돌기\n" +
                        "            turnLeft(360);\n" +
                        "            // scan();\n" +
                        "\n" +
                        "            System.out.println(Thread.currentThread().getName() + \"스레드에서의 각도: \" + getGunHeading());\n" +
                        "            try {\n" +
                        "                Thread.sleep(1500);\n" +
                        "            } catch (InterruptedException e) {\n" +
                        "                e.printStackTrace();\n" +
                        "                throw new RuntimeException(e);\n" +
                        "            }\n" +
                        "        }\n" +
                        "    }\n" +
                        "\n" +
                        "    @Override\n" +
                        "    public void onScannedRobot(ScannedRobotEvent event) {\n" +
                        "        System.out.println(\"스캐닝 성공! 대상: \" + event.getName());\n" +
                        "        System.out.println(\"총쏘기\");\n" +
                        "        fire(1);\n" +
                        "    }\n" +
                        "}\n";

        //     CompileResult robot = AwsS3ClassLoader.Instance.createRobot(author, content);
        //     System.out.println("content: \n");
    }
//
//    @Test
//    void stupidTest() {
//        // AwsS3ClassLoader loader = new AwsS3ClassLoader("robot-class");
//
//        String author = "sb";
//        String content =
//                "public class StupidBot extends Robot {\n" +
//                "\n" +
//                "    @Override\n" +
//                "    public void run() {\n" +
//                "        while (true) {\n" +
//                "            System.out.println(Thread.currentThread().getName() + \" 헤헤헤헤: \" + getX() + \", \" + getY());\n" +
//                "            try {\n" +
//                "                Thread.sleep(1000);\n" +
//                "            } catch (InterruptedException e) {\n" +
//                "                throw new RuntimeException(e);\n" +
//                "            }\n" +
//                "        }\n" +
//                "    }\n" +
//                "\n" +
//                "    @Override\n" +
//                "    public void onScannedRobot(ScannedRobotEvent event) {\n" +
//                "        System.out.println(\"헤헤헤헤헤 스캔: \" + event.getName());\n" +
//                "    }\n" +
//                "}\n";
//        CompileResult robot = AwsS3ClassLoader.Instance.createRobot(author, content);
//        System.out.println("content: \n");
//        System.out.println(robot);
//    }

//    @Test
//    void sagki2() {
//        String author = "user0";
//        String content =
//                "public class Sagak2 extends Robot {\n" +
//                "    @Override\n" +
//                "    public void run() {\n" +
//                "        while (true) {\n" +
//                "            ahead(200);\n" +
//                "            turnLeft(90);\n" +
//                "\n" +
//                "            try {\n" +
//                "                Thread.sleep(100);\n" +
//                "            } catch (InterruptedException e) {\n" +
//                "                throw new RuntimeException(e);\n" +
//                "            }\n" +
//                "        }\n" +
//                "    }\n" +
//                "\n" +
//                "\n" +
//                "}\n";
//
//        AwsS3ClassLoader classLoader = new AwsS3ClassLoader("robot-class");
//        CompileResult robot = classLoader.createRobot(author, content);
//        System.out.println(robot.exitCode);
//    }

//    @Test
//    void gogobot() {
//        String author = "user1";
//        String content =
//                "public class GogoBot extends Robot {\n" +
//                "\n" +
//                "    @Override\n" +
//                "    public void run() {\n" +
//                "        while (true) {\n" +
//                "            ahead(200);\n" +
//                "            try {\n" +
//                "                Thread.sleep(100);\n" +
//                "            } catch (InterruptedException e) {\n" +
//                "                throw new RuntimeException(e);\n" +
//                "            }\n" +
//                "        }\n" +
//                "    }\n" +
//                "}";
//
//        AwsS3ClassLoader classLoader = new AwsS3ClassLoader("robot-class");
//        CompileResult robot = classLoader.createRobot(author, content);
//        System.out.println(robot.exitCode);
//    }


//    @Test
//    void dongr2() {
//        String author = "user2";
//        String content =
            //    "public class Dongr2Bot extends Robot {\n" +
            //    "    @Override\n" +
            //    "    public void run() {\n" +
            //    "        while (true) {\n" +
            //    "            turnLeft(30);\n" +
            //    "            ahead(200);\n" +
            //    "            try {\n" +
            //    "                Thread.sleep(150);\n" +
            //    "            } catch (InterruptedException e) {\n" +
            //    "                throw new RuntimeException(e);\n" +
            //    "            }\n" +
            //    "        }\n" +
            //    "    }\n" +
            //    "}\n";
//        AwsS3ClassLoader classLoader = new AwsS3ClassLoader("robot-class");
//        CompileResult robot = classLoader.createRobot(author, content);
//        System.out.println(robot.exitCode);
//
//    }
}