package com.example.proiectlicitatii.controller;

import com.example.proiectlicitatii.model.Auction;
import com.example.proiectlicitatii.model.User;
import com.example.proiectlicitatii.service.AuctionService;
import com.example.proiectlicitatii.service.UserDetailsServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "/")
public class UserController {
    @Autowired
    private UserDetailsServiceImplementation userDetailsService;

    @Autowired
    private AuctionService auctionService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User newUser = userDetailsService.create(user);

        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/allAuctions")
    public List<Auction> getAllAuctions() {
        return auctionService.findAll();
    }
}
