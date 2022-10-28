package com.team7.campusdiscoveryservice.repository;

import com.team7.campusdiscoveryservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


//Repository needs to be an interface extending JpaRepository<Entity, IDType>
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
