package com.team7.campusdiscoveryservice.controller;

import com.team7.campusdiscoveryservice.entity.Login;
import com.team7.campusdiscoveryservice.entity.User;
import com.team7.campusdiscoveryservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


//Example for REST controller class
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("users/username/{username}")
    public ResponseEntity getUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);

        if (user == null) {
            return new ResponseEntity<String>("Invalid username",
                    HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("users")
    public ResponseEntity createUser(@RequestBody User user) throws URISyntaxException {
        User savedUser = userService.createUser(user);
        return ResponseEntity.created(new URI("/users/" + savedUser.getId())).body(savedUser);
    }

    @PostMapping("users/login/")
    public ResponseEntity login(@RequestBody Login login) throws URISyntaxException {

       User user = userService.checkLogin(login);
       if (user == null) {
           return new ResponseEntity<String>("Invalid Credentials",
                   HttpStatus.UNAUTHORIZED);
       }
        return ResponseEntity.created(new URI("/users/" + user.getId())).body(user);


    }

    @PutMapping("users/{id}")
    public ResponseEntity updateUser(@PathVariable Long id,
                                       @RequestBody User user) {
        User currentUser =
                userService.updateUser(id, user);
        return ResponseEntity.ok(currentUser);
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }



}
