package com.bknote71.basicwebsocketrobocode.entity;

import com.bknote71.basicwebsocketrobocode.entity.repository.RobotSpecRepository;
import com.bknote71.basicwebsocketrobocode.entity.repository.UserRepository;
import com.bknote71.basicwebsocketrobocode.robocode.core.RobotSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RobotSpecRepository robotSpecRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public void run(String... args) throws Exception {
        UserEntity user = new UserEntity("sa", passwordEncoder.encode("sa"));

        RobotSpecEntity robot0 = new RobotSpecEntity();
        robot0.setName("tangtang2");
        robot0.setAuthor("sa");
        robot0.setFullClassName("FireBot.class");
        robot0.setUser(user);

        RobotSpecEntity robot1 = new RobotSpecEntity();
        robot1.setName("myrobot");
        robot1.setAuthor("bk");
        robot1.setFullClassName("MyRobot.class");
        robot1.setUser(user);

        RobotSpecEntity robot2 = new RobotSpecEntity();
        robot2.setName("hirobot");
        robot2.setAuthor("hi");
        robot2.setFullClassName("HiRobot.class");
        robot2.setUser(user);

        user.add(robot0);
        user.add(robot1);
        user.add(robot2);

        userRepository.save(user);

        ///////////////////////////////
        UserEntity user2 = new UserEntity("sb", "");

        RobotSpecEntity brobot = new RobotSpecEntity();
        brobot.setName("멍충이");
        brobot.setAuthor("sb");
        brobot.setFullClassName("StupidBot.class");
        brobot.setUser(user2);

        user2.add(brobot);
        userRepository.save(user2);
    }
}
