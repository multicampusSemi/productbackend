package com.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.project.service.kdhUserService;

@RestController
@RequestMapping("/web")
public class kdhValidationController {
    private final kdhUserService userService;

    public kdhValidationController(kdhUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/validate-username")
    public ResponseEntity<Map<String, Boolean>> validateUsername(@RequestParam String username) {
        boolean exists = userService.isUsernameExists(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate-email")
    public ResponseEntity<Map<String, Boolean>> validateEmail(@RequestParam String email) {
        boolean exists = userService.isEmailExists(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
}