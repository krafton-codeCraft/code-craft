package com.bknote71.basicwebsocketrobocode.entity;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class RobotSpecEntity {

    @Id @GeneratedValue
    private Long id;

    private String name;
    private String author;
    private String fullClassName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
