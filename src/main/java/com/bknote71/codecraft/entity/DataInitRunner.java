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
//        UserEntity user = userRepository.findByUsername("user2");
//        RobotSpecEntity robotSpecEntity = new RobotSpecEntity();
//        robotSpecEntity.setName("Dongr2Bot");
//        robotSpecEntity.setFullClassName("Dongr2Bot.class");
//        robotSpecEntity.setUser(user);
//        robotSpecEntity.setAuthor("user2");
//        robotSpecRepository.save(robotSpecEntity);
    }
}
