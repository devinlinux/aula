package com.michaelb.nucleus.models;

//  imports
import jakarta.persistence.Embeddable;
import jakarta.persistence.Column;

@Embeddable
public class ForumResponse {
    private String posterName;
    private String posterEmail;
    @Column(columnDefinition = "TEXT")
    private String contents;

    public ForumResponse() {
        this(null, null, null);
    }

    public ForumResponse(String posterName, String posterEmail, String contents) {
        this.posterName = posterName;
        this.posterEmail = posterEmail;
        this.contents = contents;
    }

    public void setPosterName(String posterName) {
        this.posterName = posterName;
    }

    public String getPosterName() {
        return this.posterName;
    }

    public void setPosterEmail(String posterEmail) {
        this.posterEmail = posterEmail;
    }

    public String getPosterEmail() {
        return this.posterEmail;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getContents() {
        return this.contents;
    }
}
