package com.bknote71.codecraft.entity;

import com.bknote71.codecraft.entity.repository.RobotSpecRepository;
import com.bknote71.codecraft.entity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@RequiredArgsConstructor
public class DataInitRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RobotSpecRepository robotSpecRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // ㅎㅎ
        UserEntity user = userRepository.findByUsername("sa");
        RobotSpecEntity robotSpecEntity = new RobotSpecEntity();
        robotSpecEntity.setName("sa");
        robotSpecEntity.setFullClassName("FireBot.class");
        robotSpecEntity.setUser(user);
        robotSpecEntity.setUsername("sa");
        robotSpecEntity.setCode( "public class FireBot extends Robot {\n" +
                "    @Override\n" +
                "    public void run() {\n" +
                "        while (true) {\n" +
                "            turnLeft(360);\n" +
                "\n" +
                "            try {\n" +
                "                Thread.sleep(300);\n" +
                "            } catch (InterruptedException e) {\n" +
                "                e.printStackTrace();\n" +
                "                throw new RuntimeException(e);\n" +
                "            }\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "    @Override\n" +
                "    public void onScannedRobot(ScannedRobotEvent event) {\n" +
                "        System.out.println(\"scanning success target: \" + event.getName());\n" +
                "        System.out.println(\"shooooooooooooooot\");\n" +
                "        fire(1);\n" +
                "    }\n" +
                "}\n");
        robotSpecRepository.save(robotSpecEntity);
    }
}
