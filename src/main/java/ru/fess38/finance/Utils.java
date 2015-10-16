package ru.fess38.finance;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;


public final class Utils {
    public static String readFile(String filepath) {
        try {
            ClassPathResource resource = new ClassPathResource(filepath);
            InputStream inputStream = resource.getInputStream();
            return IOUtils.toString(inputStream);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
