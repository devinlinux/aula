package com.michaelb.nucleus.models;

// imports
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import org.hibernate.annotations.UuidGenerator;
import com.michaelb.nucleus.dto.UserDTO;

@Entity
@Table(name = "users")
public class User {
    @Id
    @UuidGenerator
    @Column(unique = true)
    private String id;
    private String firstName;
    private String lastName;
    private String password;
    @Column(unique = true)
    private String email;
    private String major;
    private Integer graduationYear;
    private String profilePicture;

    public User() {
        this(null, null, null, null, null, null, 0, null);
    }

    public User(String id, String firstName, String lastName, String email, String password, String major, int graduationYear, String profilePicture) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.major = major;
        this.graduationYear = graduationYear;
        this.profilePicture = profilePicture;
    }

    public UserDTO intoDTO() {
        return new UserDTO(
                this.firstName,
                this.lastName,
                this.email,
                this.major,
                this.graduationYear,
                this.profilePicture
        );
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
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
}
