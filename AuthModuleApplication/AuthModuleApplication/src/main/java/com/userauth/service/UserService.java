package com.userauth.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.userauth.entity.User;
import com.userauth.repository.UserRepository;
import com.userauth.utils.InputValidator;
import com.userauth.utils.PasswordUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(String email, String password, String fullName, String phoneNumber) {
        System.out.println("Registering user with email: " + email);  // For debugging

        if (!InputValidator.isValidEmail(email) || !InputValidator.isValidPassword(password)) {
            System.out.println("Invalid email or password format");
            return false;  // Return false if email or password is invalid
        }

        // Check if user already exists in the database
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            System.out.println("User already exists with email: " + email);
            return false;  // Return false if the email already exists in the database
        }

        // Encrypt the password
        String encryptedPassword = PasswordUtil.encryptPassword(password);
        User user = new User();
        user.setEmail(email);
        user.setPassword(encryptedPassword);
        user.setFullName(fullName);
        user.setPhoneNumber(phoneNumber);
        user.setCreatedAt(new Date());

        // Save the new user in the database
        userRepository.save(user);
        System.out.println("User successfully registered with email: " + email);
        return true;  // Return true if user was successfully saved
    }




    public boolean authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && PasswordUtil.checkPassword(password, user.getPassword())) {
            return true;
        }
        return false;
    }

    public User getUserProfile(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public boolean updateUserProfile(String email, String fullName, String phoneNumber) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            user.setFullName(fullName);
            user.setPhoneNumber(phoneNumber);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}

