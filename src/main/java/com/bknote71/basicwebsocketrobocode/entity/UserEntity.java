package com.bknote71.basicwebsocketrobocode.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id @GeneratedValue
    private Long id;

    private String username;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<RobotSpecEntity> specifications = new ArrayList<>();

    public UserEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public void add(RobotSpecEntity robot) {
        specifications.add(robot);
    }
}
