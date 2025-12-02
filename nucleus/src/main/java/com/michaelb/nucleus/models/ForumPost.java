package com.michaelb.nucleus.models;

//  imports
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.JoinColumn;

import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name="forum_posts")
public class ForumPost {
    @Id
    @UuidGenerator()
    @Column(unique = true)
    private String id;
    private Long creationTime;
    private String title;
    private String associatedClass;
    private String contents;
    private String poster;

    @ElementCollection
    @CollectionTable(name="forum_responses", joinColumns=@JoinColumn(name="forum_post_id"))
    private List<ForumResponse> responses;

    public ForumPost() {
        this(0L, null, null, null, null, null);
    }

    public ForumPost(Long creationTime, String title, String associatedClass, String contents, String poster, List<ForumResponse> responses) {
        this.creationTime = creationTime;
        this.title = title;
        this.associatedClass = associatedClass;
        this.contents = contents;
        this.poster = poster;
        this.responses = responses;
    }

    public void addResponse(ForumResponse response) {
        this.responses.add(response);
    }

    public void setCreationTime(Long creationTime) {
        this.creationTime = creationTime;
    }

    public Long getCreationTime() {
        return this.creationTime;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return this.title;
    }

    public void setAssociatedClass(String associatedClass) {
        this.associatedClass = associatedClass;
    }

    public String getAssociatedClass() {
        return this.associatedClass;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getContents() {
        return this.contents;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getPoster() {
        return this.poster;
    }

    public void setResponses(List<ForumResponse> responses) {
        this.responses = responses;
    }

    public List<ForumResponse> getResponses() {
        return this.responses;
    }
}