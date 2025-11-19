package com.michaelb.nucleus.util;

public class Constants {
    private static final String SEP = java.io.File.separator;
    public static final String RESOURCES_DIR = String.format("%s%speronal%sDocuments%saula_resources%s", System.getProperty("user.home"), SEP, SEP, SEP, SEP);
    public static final String PROFILE_PICTURE_DIR = String.format("users%simages%s", SEP, SEP);
    public static final String GROUP_IMAGE_DIR = String.format("groups%simages%s", SEP, SEP);
}
