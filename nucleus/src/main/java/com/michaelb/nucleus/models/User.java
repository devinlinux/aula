package com.michaelb.nucleus.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "users")
public class User {
    @Id
    @UuidGenerator
    @Column(unique = true)
    private String id;
    private String firstName;
    private String lastName;
    private String hashedPassword;
    @Column(unique = true)
    private String email;
    private Major major;
    private Integer graduationYear;
    private String photoUrl;
}
