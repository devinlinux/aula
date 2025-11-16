package types;

public record User(Long id, String email, String firstName, String lastName, int graduationYear) implements Comparable<User> {
    @Override
    public int compareTo(User other) {
        return this.id.compareTo(other.id);
    }
}