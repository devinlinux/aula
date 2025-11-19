package com.michaelb.nucleus.util;

// imports
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import java.util.Optional;
import java.util.function.Function;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.michaelb.util.TriFunction;

public class FileOperations {

    public final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    public final BiFunction<String, MultipartFile, String> imageSaver = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
    };
}
