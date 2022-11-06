package com.team7.campusdiscoveryservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "events")
public class Event {

    //Id tag indicates primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "event_date", nullable = false)
    private Date date;

    @Column(name = "start_time", nullable = false)
    private Time startTime;

    @Column(name = "description", nullable = false, length = 200)
    private String description;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "image", nullable = false, length = 1000)
    private String image;

    @Column(name = "inviteOnly", nullable = false)
    private boolean inviteOnly = false;

    @JsonIgnoreProperties({"rsvp", "createdEvents", "invited"})
    @ManyToOne(optional = false)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator = new User();


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "event")
    private Set<RSVP> rsvped = new LinkedHashSet<RSVP>();


    @JsonIgnoreProperties({"rsvp", "createdEvents", "invited"})
    @ManyToMany
    @JoinTable(name = "event_invite",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> invites = new LinkedHashSet<>();

    public static final String defaultImageURL = "gtLogo.png";

    public Event() {
    }

    public Event(String title, Date date, Time startTime, String description, String location, String image) {
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.description = description;
        this.location = location;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<RSVP> getRsvped() {
        return rsvped;
    }

    public void setRsvped(Set<RSVP> rsvped) {
        this.rsvped = rsvped;
    }

    public Set<User> getInvites() {
        return invites;
    }

    public void setInvites(Set<User> invites) {
        this.invites = invites;
    }

    public boolean isInviteOnly() {
        return inviteOnly;
    }

    public void setInviteOnly(boolean inviteOnly) {
        this.inviteOnly = inviteOnly;
    }

    @PreRemove
    private void removeConnections() {
        for (User u: invites) {
            u.removeInvite(this);
        }

        this.invites.clear();
    }


}
