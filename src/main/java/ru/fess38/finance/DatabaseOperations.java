package ru.fess38.finance;

import com.yandex.disk.rest.RestClient;
import com.yandex.disk.rest.json.Link;

import java.io.File;
import java.util.Arrays;
import java.util.List;

public class DatabaseOperations {
  private final List<String> fileNames = Arrays.asList("Finance.script", "Finance.properties",
      "Finance.log");
  private final File localDir = new File("./db");
  private final String cloudDir = "/finance/db/";

  public void download(RestClient restClient) throws Exception {
    File[] files = localDir.listFiles() == null ? new File[]{} : localDir.listFiles();
    Arrays.stream(files).forEach(File::delete);
    localDir.mkdir();
    for (String filename : fileNames) {
      File file = new File(localDir, filename);
      restClient.downloadFile(cloudDir + filename, file, null);
    }
  }

  public void upload(RestClient restClient) throws Exception {
    String backupDir = "/finance/backup/" + String.valueOf(System.currentTimeMillis());
    restClient.makeFolder(backupDir);
    for (String filename : fileNames) {
      File file = new File(localDir, filename);
      Link link = restClient.getUploadLink(backupDir + "/" + filename, false);
      restClient.uploadFile(link, false, file, null);
    }
    restClient.copy(backupDir, cloudDir, true);
  }
}
