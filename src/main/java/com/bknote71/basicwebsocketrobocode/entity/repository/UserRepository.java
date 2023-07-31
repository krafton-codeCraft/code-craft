package com.bknote71.basicwebsocketrobocode.entity.repository;

import com.bknote71.basicwebsocketrobocode.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}
