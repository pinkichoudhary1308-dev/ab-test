package com.main.service;

import com.main.model.User;
import java.util.Optional;

public interface UserService {
    Optional<User> getUserByEmail(String email);  // for login check
    User saveUser(User user);                    // for signup
}
