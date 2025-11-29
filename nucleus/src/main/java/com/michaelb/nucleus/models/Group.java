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
    private String times;
    private ArrayList<String> members;
    private String creator;
    private String bannerImage;

    public Group() {
        this(null, null, null, null, null, null);
    }

    public Group(String name, String associatedClass, String times, ArrayList<String> members, String creator, String bannerImage) {
        this.name = name;
        this.associatedClass = associatedClass;
        this.times = times;
        this.members = members;
        this.creator = creator;
        this.bannerImage = bannerImage;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setAssociatedClass(String associatedClass) {
        this.associatedClass = associatedClass;
    }

    public String getAssociatedClass() {
        return this.associatedClass;
    }

    public void setTimes(String times) {
        this.times = times;
    }

    public String getTimes() {
        return this.times;
    }

    public void setMembers(ArrayList<String> members) {
        this.members = members;
    }

    public ArrayList<String> getMembers() {
        return this.members;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getCreator() {
        return this.creator;
    }

    public void setBannerImage(String bannerImage) {
        this.bannerImage = bannerImage;
    }

    public String getBannerImage() {
        return this.bannerImage;
    }
}
