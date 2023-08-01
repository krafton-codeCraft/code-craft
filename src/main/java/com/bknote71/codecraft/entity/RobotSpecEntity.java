package com.bknote71.codecraft.entity;


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
    private String code; // java code

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
