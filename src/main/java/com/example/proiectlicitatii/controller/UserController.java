package com.example.proiectlicitatii.controller;

import com.example.proiectlicitatii.model.User;
import com.example.proiectlicitatii.service.UserDetailsServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "/")
public class UserController {
    @Autowired
    private UserDetailsServiceImplementation userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User newUser = userDetailsService.create(user);

        return ResponseEntity.ok(newUser);
    }
}
