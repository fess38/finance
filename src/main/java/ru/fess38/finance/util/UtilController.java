package ru.fess38.finance.util;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UtilController {
  @Autowired
  private OldAppExportLoader exportLoader;
  @Autowired
  private DatabaseCleaner databaseCleaner;

  @RequestMapping(value = "/util/import", method = RequestMethod.GET, params = {"path"})
  @ResponseBody
  public String load(@RequestParam("path") String path) throws Exception {
    try {
      exportLoader.load(path);
    } catch (Exception e) {
      return ExceptionUtils.getStackTrace(e);
    }
    return "Loaded";
  }

  @RequestMapping(value = "/util/clean", method = RequestMethod.GET)
  @ResponseBody
  public String clean() {
    databaseCleaner.clean();
    return "Cleaned";
  }
}
