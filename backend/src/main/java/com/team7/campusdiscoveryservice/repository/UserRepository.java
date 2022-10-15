package com.team7.campusdiscoveryservice.repository;

import com.team7.campusdiscoveryservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


//Repository needs to be an interface extending JpaRepository<Entity, IDType>
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
