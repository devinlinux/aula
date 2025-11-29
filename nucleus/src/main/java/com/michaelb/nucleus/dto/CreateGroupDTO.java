package com.michaelb.nucleus.dto;

// imports
import java.util.ArrayList;

import com.michaelb.nucleus.models.Group;

public record CreateGroupDTO(String name, String associatedClass, ArrayList<String> times, String creator) {
    public Group intoGroup() {
        return new Group(
                name,
                associatedClass,
                times,
                new ArrayList<>(),
                creator,
                null
        );
    }
}