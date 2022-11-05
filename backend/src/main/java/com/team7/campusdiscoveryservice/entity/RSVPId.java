package com.team7.campusdiscoveryservice.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RSVPId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "event_id")
    private Long eventId;

    public RSVPId() {
    }

    public RSVPId(Long userId, Long eventId) {
        this.userId = userId;
        this.eventId = eventId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RSVPId rsvpId = (RSVPId) o;
        return Objects.equals(userId, rsvpId.userId) && Objects.equals(eventId, rsvpId.eventId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, eventId);
    }


}
