package com.michaelb.nucleus.dto;

// imports
import java.util.ArrayList;

import com.michaelb.nucleus.models.Group;
import com.michaelb.nucleus.models.MeetingTime;

public record CreateGroupDTO(String name, String associatedClass, ArrayList<MeetingTime> times, String creator) {
    public Group intoGroup() {
        return new Group(
                name,
                associatedClass,
                times,
                new ArrayList<String>(),
                creator,
                null
        );
    }
}