package com.michaelb.nucleus.models;

public class MeetingTime {

    private Day day;
    private int hour;
    private int minute;

    private enum Day {
        SUNDAY,
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
    }
}
