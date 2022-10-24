package com.team7.campusdiscoveryservice.service;

import com.team7.campusdiscoveryservice.entity.Event;
import com.team7.campusdiscoveryservice.entity.User;
import com.team7.campusdiscoveryservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers() {

        return this.userRepository.findAll();
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("users")
    public User createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public User updateUser(Long id, User user) {
        User currentUser =
                this.getUser(id);
        currentUser.setUsername(user.getUsername());
        currentUser.setPassword(user.getPassword());
        currentUser.setRole(user.getRole());
        userRepository.save(currentUser);

        return currentUser;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User rsvpToEvent(User user, Event event) {
        user.addRSVPEvent(event);
//        event.getRsvped().add(user);
//        eventService.updateEvent(eventID, event, event.getCreator().getId());
        userRepository.save(user);
        return user;
    }

    public void unRsvpToEvent(User user, Event event) {
        user.removeRSVPEvent(event);
        userRepository.save(user);
    }
}
