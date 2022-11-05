package com.team7.campusdiscoveryservice.repository;

import com.team7.campusdiscoveryservice.entity.RSVP;
import com.team7.campusdiscoveryservice.entity.RSVPId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RSVPRepository extends JpaRepository<RSVP, RSVPId> {
}
