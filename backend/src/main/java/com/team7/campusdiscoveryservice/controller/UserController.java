package com.team7.campusdiscoveryservice.controller;

import com.team7.campusdiscoveryservice.entity.User;
import com.team7.campusdiscoveryservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


//Example for REST controller class
@RestController
@RequestMapping("api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public List<User> getUsers() {
        return this.userRepository.findAll();
    }

    @GetMapping("users/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("users")
    public ResponseEntity createUser(@RequestBody User user) throws URISyntaxException {
        User savedUser = userRepository.save(user);
        return ResponseEntity.created(new URI("/users/" + savedUser.getId())).body(savedUser);
    }

    @PutMapping("users/{id}")
    public ResponseEntity updateUser(@PathVariable Long id,
                                       @RequestBody User user) {
        User currentUser =
                userRepository.findById(id).orElseThrow(RuntimeException::new);
        currentUser.setUsername(user.getUsername());
        currentUser.setPassword(user.getPassword());
        userRepository.save(currentUser);

        return ResponseEntity.ok(currentUser);
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
