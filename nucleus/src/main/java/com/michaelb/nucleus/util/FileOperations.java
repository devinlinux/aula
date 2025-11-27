package com.michaelb.nucleus.util;

// imports
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.Function;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import org.springframework.web.multipart.MultipartFile;

public class FileOperations {

    private static final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    public static String imageSaver(String path, String email, MultipartFile image) {
        String filename = email + fileExtension.apply(image.getOriginalFilename());

        try {
            Path fileStorageLocation = Paths.get(Constants.RESOURCES_DIR + path).toAbsolutePath().normalize();

            if (!Files.exists(fileStorageLocation))
                Files.createDirectories(fileStorageLocation);

            Path imagePath = fileStorageLocation.resolve(filename);
            Files.copy(image.getInputStream(), imagePath, REPLACE_EXISTING);
            return imagePath.toString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to save image");
        }
    }
}
