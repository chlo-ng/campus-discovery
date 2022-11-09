package com.team7.campusdiscoveryservice.entity;

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
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @JsonIgnoreProperties({"creator", "rsvped", "invites"})
    @OneToMany(mappedBy = "creator",
            orphanRemoval = true)
    private Set<Event> createdEvents = new LinkedHashSet<>();

    @JsonIgnoreProperties({"creator", "rsvped", "invites", "user"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private Set<RSVP> rsvp = new LinkedHashSet<RSVP>();

    @JsonIgnoreProperties({"creator", "rsvped", "invites"})
    @ManyToMany(mappedBy = "invites")
    private Set<Event> invited = new LinkedHashSet<>();

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

    public void removeCreatedEvent(Event event) {
        this.createdEvents.remove(event);
    }

    public Set<RSVP> getRsvp() {
        return rsvp;
    }

    public void setRsvp(Set<RSVP> rsvp) {
        this.rsvp = rsvp;
    }

    public Set<Event> getInvited() {
        return invited;
    }

    public void setInvited(Set<Event> invited) {
        this.invited = invited;
    }

    public void removeInvite(Event event) {
        this.invited.remove(event);
    }

    @PreRemove
    private void removeConnections() {
        for (Event e: invited) {
            e.getInvites().remove(this);
        }
    }


}
