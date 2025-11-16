package internals;

import java.util.Map;
import java.util.HashMap;

import types.Identifiable;

public class Database<T extends Identifiable & Comparable<T>> {
    private final Map<Long, T> memtable;
    private final String directory;
    private final String filePath;

    public Database(DBMode mode, String directory, String name) {
        this.memtable = new HashMap<>();
        this.directory = directory;
        this.filePath = directory + "/" + name + ".db";

        switch (mode) {
            case NEW -> {

            }
            case RECOVER -> {

            }
        }
    }
}