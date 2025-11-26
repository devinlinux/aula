package com.michaelb.nucleus.dto;

import com.michaelb.nucleus.models.User;

public record RegisterDTO(String firstName, String lastName, String password, String email, String major, Integer graduationYear) {
    public User intoUser() {
        return new User(
                null,
                firstName,
                lastName,
                password,
                email,
                major,
                graduationYear,
                ""
        );
    }
}
