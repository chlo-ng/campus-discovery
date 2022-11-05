package com.team7.campusdiscoveryservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonValue;

import javax.persistence.*;

@Entity
@Table(name = "rsvp")
public class RSVP implements java.io.Serializable {

    @EmbeddedId
    private RSVPId pk = new RSVPId();

    @JsonIgnoreProperties({"rsvp", "createdEvents"})
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnoreProperties({"creator", "rsvped"})
    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    private Event  event;

    @Enumerated(EnumType.STRING)
    @Column(name = "rsvp", nullable = false)
    private RsvpValue rsvp;

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
}
