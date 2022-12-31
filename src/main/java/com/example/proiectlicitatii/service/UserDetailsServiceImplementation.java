package com.example.proiectlicitatii.service;

import com.example.proiectlicitatii.model.User;
import com.example.proiectlicitatii.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByUsername(username);

        return userOptional.orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    }

    public User create(User user) {
//        user.setName("Andreea");
//        user.setSurname("Tatar");
//        user.setUsername("andreea");
//        user.setUserLocation("Bm");
//        user.setPhoneNumber("1234");
        user.setPassword(passwordEncoder().encode(user.getPassword()));

        return userRepository.save(user);
    }


}
