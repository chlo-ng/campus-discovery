package com.team7.campusdiscoveryservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;


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
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @JsonIgnoreProperties({"creator", "rsvped"})
    @ManyToMany
    @JoinTable(name = "users_rsvp",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id"))
    private Set<Event> rsvp = new LinkedHashSet<>();

    @JsonIgnoreProperties({"creator", "rsvped"})
    @OneToMany(mappedBy = "creator",
            orphanRemoval = true)
    private Set<Event> createdEvents = new LinkedHashSet<>();

    public User() {
    }

    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Event> getCreatedEvents() {
        return createdEvents;
    }

    public void setCreatedEvents(Set<Event> createdEvents) {
        this.createdEvents = createdEvents;
    }

    public Set<Event> getRsvp() {
        return rsvp;
    }

    public void setRsvp(Set<Event> rsvp) {
        this.rsvp = rsvp;
    }

    public void addRSVPEvent(Event event) {
        this.rsvp.add(event);
        event.getRsvped().add(this);
    }

    public void removeCreatedEvent(Event event) {
        this.createdEvents.remove(event);
    }

    public void removeRSVPEvent(Event event) {
        this.rsvp.remove(event);
    }

    @PreRemove
    private void removeConnections() {
        for (Event e: rsvp) {
            e.getRsvped().remove(this);
        }
    }


}
