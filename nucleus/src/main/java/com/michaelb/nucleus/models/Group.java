package com.michaelb.nucleus.models;

// imports
import java.util.ArrayList;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "groups")
public class Group {
    @Id
    @UuidGenerator()
    @Column(unique = true)
    private String id;
    private String name;
    private String associatedClass;
    private ArrayList<MeetingTime> times;
    private ArrayList<String> members;  // user ids
    private String creator;  // user id
}
