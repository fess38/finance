package ru.fess38.finance;

import freemarker.template.Configuration;
import freemarker.template.Template;
import org.apache.commons.lang3.exception.ExceptionUtils;

import java.io.StringWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public final class TemplateConfig {
    private TemplateConfig() { }

    private static Configuration config;

    public static Configuration getInstance() {
        if (config == null) {
            initConfig();
        }
        return config;
    }

    private static void initConfig() {
        config = new Configuration(Configuration.VERSION_2_3_22);
        config.setDefaultEncoding(StandardCharsets.UTF_8.name());
        config.setClassForTemplateLoading(TemplateConfig.class, "/");
        config.setTemplateUpdateDelay(5);
    }

    public static String procces(Map<String, Object> templateData, String templatePath) {
        try {
            Template template = getInstance().getTemplate(templatePath);
            Writer out = new StringWriter();
            template.process(templateData, out);
            return out.toString();
        } catch (Exception e) {
            return ExceptionUtils.getStackTrace(e);
        }
    }
}
