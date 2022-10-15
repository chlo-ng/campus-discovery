package com.team7.campusdiscoveryservice.entity;

import javax.persistence.*;


//Indicates that User is an entity
//Specifies the table holding users
//assumed to be class name if not specified
@Entity
@Table(name = "users")
public class User {

    //Id tag indicates primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    //Don't specify name will assume variable name
    @Column(name = "password", nullable = false)
    private String password;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
