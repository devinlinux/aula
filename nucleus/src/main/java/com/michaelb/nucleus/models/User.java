package com.michaelb.nucleus.models;

// imports
import java.util.List;
import java.util.ArrayList;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import com.michaelb.nucleus.dto.UserDTO;

@Entity
@Table(name = "users")
public class User {
    private String firstName;
    private String lastName;
    private String password;
    @Id
    @Column(unique = true)
    private String email;
    private String major;
    private Integer graduationYear;
    private String profilePicture;
    private List<String> groups;

    public User() {
        this(null, null, null, null, null, 0, null);
    }

    public User(String firstName, String lastName, String email, String password, String major, int graduationYear, String profilePicture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.major = major;
        this.graduationYear = graduationYear;
        this.profilePicture = profilePicture;
        this.groups = new ArrayList<>();
    }

    public UserDTO intoDTO() {
        return new UserDTO(
                this.firstName,
                this.lastName,
                this.email,
                this.major,
                this.graduationYear
        );
    }

    public void addToGroup(String id) {
        this.groups.add(id);
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return this.password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getMajor() {
        return this.major;
    }

    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }

    public Integer getGraduationYear() {
        return this.graduationYear;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getProfilePicture() {
        return this.profilePicture;
    }

    public void setGroups(List<String> groups) {
        this.groups = groups;
    }

    public List<String> getGroups() {
        return this.groups;
    }
}
