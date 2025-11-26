package com.michaelb.nucleus.dto;

import com.michaelb.nucleus.models.User;

public record RegisterDTO(String firstName, String lastName, String email, String password, String major, Integer graduationYear) {
    public User intoUser() {
        return new User(
                firstName,
                lastName,
                email,
                password,
                major,
                graduationYear
        );
    }
}
