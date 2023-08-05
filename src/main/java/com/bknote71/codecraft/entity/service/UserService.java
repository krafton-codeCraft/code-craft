package com.bknote71.codecraft.entity.service;

import com.bknote71.codecraft.entity.UserEntity;
import com.bknote71.codecraft.entity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Long signup(String username, String password) {
        UserEntity user = userRepository.findByUsername(username);
        if (user != null) {
            System.out.println("이미 존재하는 아이디 입니다.");
            return null;
        }

        UserEntity userEntity = new UserEntity(username, passwordEncoder.encode(password));
        UserEntity savedUser = userRepository.save(userEntity);

        System.out.println("create user success " + savedUser.getUsername());

        return savedUser.getId();
    }

    public Long login(String username, String password) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            System.out.println("존재하지 않는 유저입니다.");
            return null;
        }

        return user.getId();
    }
}
