package com.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.main.model.User;
import com.main.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Sign up a new user
    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().build(); // Email already exists
        }
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // Sign in an existing user
    @PostMapping("/signin")
    public ResponseEntity<User> signIn(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            if (existingUser.get().getPassword().equals(user.getPassword())) {
                return ResponseEntity.ok(existingUser.get());
            } else {
                return ResponseEntity.status(401).build(); // Wrong password
            }
        }
        return ResponseEntity.notFound().build();
    }
}
