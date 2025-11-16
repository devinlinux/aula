package types;

import java.util.ArrayList;

public class User implements Identifiable, Comparable<User> {
    private final Long id;
    private final String email;
    private final String firstName;
    private final String lastName;
    private final int graduationYear;
    private final ArrayList<Group> groups;

    public User(long id, String email, String firstName, String lastName, int graduationYear) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.graduationYear = graduationYear;
        this.groups = new ArrayList<>();
    }

    public void addGroup(Group group) {
        this.groups.add(group);
    }

    public long id() {
        return this.id;
    }

    @Override
    public int compareTo(User other) {
        return this.id.compareTo(other.id);
    }
}