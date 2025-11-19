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

import com.michaelb.nucleus.util.TriFunction;

public class FileOperations {

    private static final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    public static final TriFunction<String, String, MultipartFile, String> imageSaver = (path, id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());

        try {
            Path fileStorageLocation = Paths.get(Constants.RESOURCES_DIR).toAbsolutePath().normalize();
            if (Files.exists(fileStorageLocation))
                Files.createDirectories(fileStorageLocation);

            Files.copy(image.getInputStream(), fileStorageLocation.resolve(id + ".png"), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path(path + filename).toUriString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
