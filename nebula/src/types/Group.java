package types;

import java.util.ArrayList;

public class Group implements Identifiable, Comparable<Group> {
    private final Long id;
    private final String name;
    private final ArrayList<String> members;

    public Group(long id, String name) {
        this.id = id;
        this.name = name;
        this.members = new ArrayList<>();
    }

    public void addMember(String name) {
        this.members.add(name);
    }

    public long id() {
        return this.id;
    }

    @Override
    public int compareTo(Group other) {
        return this.id.compareTo(other.id);
    }

    @Override
    public String toString() {
        return "";
    }
}
