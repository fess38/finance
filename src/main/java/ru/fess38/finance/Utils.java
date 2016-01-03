package ru.fess38.finance;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.core.io.ClassPathResource;


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
    
    public static URL getClassPathUrl(String classpath) {
    	ClassPathResource resource = new ClassPathResource(classpath);
    	try {
    		return resource.getURL();	
    	} catch (Exception e) {
    		throw new IllegalArgumentException("Unknown resource: " + classpath);
    	}
    }
    
    public static Date toDate(LocalDate localDate) {
    	return Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
    }
    
    public static int dayOfMonth(Date date) {
        return (int) DateUtils.getFragmentInDays(date, Calendar.MONTH);
    }
}
