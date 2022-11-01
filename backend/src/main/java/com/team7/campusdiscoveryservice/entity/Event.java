package com.team7.campusdiscoveryservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.LinkedHashSet;
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

    @JsonIgnoreProperties({"rsvp", "createdEvents"})
    @ManyToOne(optional = false)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator = new User();

    @JsonIgnoreProperties({"rsvp", "createdEvents"})
    @ManyToMany(mappedBy = "rsvp")
    private Set<User> rsvped = new LinkedHashSet<>();

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

    public void addRSVPed(User user) {

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
    public Set<User> getRsvped() {
        return rsvped;
    }

    public void setRsvped(Set<User> rsvped) {
        this.rsvped = rsvped;
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

    @PreRemove
    private void removeConnections() {
//        this.getCreator().removeCreatedEvent(this);
        for (User u: rsvped) {
            u.removeRSVPEvent(this);
        }

        this.rsvped.clear();

    }


}
