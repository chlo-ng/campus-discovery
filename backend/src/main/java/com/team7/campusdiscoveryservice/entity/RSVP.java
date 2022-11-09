package com.team7.campusdiscoveryservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "rsvp")
public class RSVP implements java.io.Serializable {

    @EmbeddedId
    private RSVPId pk = new RSVPId();

    @JsonIgnoreProperties({"rsvp", "createdEvents", "invited"})
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnoreProperties({"creator", "rsvped", "invites"})
    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    private Event  event;

    @Enumerated(EnumType.STRING)
    @Column(name = "rsvp", nullable = false)
    private RsvpValue rsvp;

    public RSVP(RSVPId pk, User user, Event event, RsvpValue rsvp) {
        this.pk = pk;
        this.user = user;
        this.event = event;
        this.rsvp = rsvp;
    }

    public RSVP() {
    }

    public RSVPId getPk() {
        return pk;
    }

    public void setPk(RSVPId pk) {
        this.pk = pk;
    }


    public RsvpValue getRsvp() {
        return rsvp;
    }

    public void setRsvp(RsvpValue rsvp) {
        this.rsvp = rsvp;
    }

    public User getUser() {
        return user;
    }

    public Event getEvent() {
        return event;
    }

}
