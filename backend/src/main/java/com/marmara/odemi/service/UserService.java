package com.marmara.odemi.service;

import com.marmara.odemi.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

    public List<User> findAll();

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
