package com.userauth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.userauth.entity.User;
import com.userauth.repository.UserRepository;
import com.userauth.service.UserService;
import com.userauth.utils.PasswordUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {
  
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, Object> userData) {
        String email = (String) userData.get("email");
        String password = (String) userData.get("password");
        String fullName = (String) userData.get("fullName");
        String phoneNumber = (String) userData.get("phoneNumber");

        // Debugging output
        System.out.println("Received registration request with email: " + email);

        if (email == null || password == null || fullName == null || phoneNumber == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        boolean success = userService.registerUser(email, password, fullName, phoneNumber);
        return success 
            ? ResponseEntity.ok("Registration successful") 
            : ResponseEntity.badRequest().body("Invalid input or user already exists");
    }


    @PostMapping("/login")
    public String loginUser(@RequestBody Map<String, Object> userData) {
    	String email = (String) userData.get("email");
        String password = (String) userData.get("password");
        boolean authenticated = userService.authenticateUser(email, password);
        return authenticated ? "Login successful" : "Invalid credentials";
    }

    @GetMapping("/profile")
    public User getProfile(@RequestParam String email) {
        return userService.getUserProfile(email);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String fullName = userData.get("fullName");
        String phoneNumber = userData.get("phoneNumber");
        String password = userData.get("password");

        if (email == null || fullName == null || phoneNumber == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        // Process the update and return a response
        System.out.println("Updating user: " + email + ", " + fullName + ", " + phoneNumber + ", " + password);
        return ResponseEntity.ok("Profile updated successfully");
    }

}


