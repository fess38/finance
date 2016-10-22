package ru.fess38.finance.util;

import com.typesafe.config.Config;
import com.yandex.disk.rest.Credentials;
import com.yandex.disk.rest.RestClient;
import com.yandex.disk.rest.json.Link;

import java.io.File;
import java.util.Arrays;
import java.util.List;

public class DiskUtil {
  public DiskUtil(Config config) {
    this.config = config;
    localDir = config.getString("dir.local");
    lastBackupDir = config.getString("dir.last-backup");
    backupFiles = config.getStringList("backup-files");
  }

  private final Config config;
  private RestClient restClient;
  private final String localDir;
  private final String lastBackupDir;
  private final List<String> backupFiles;

  public void download() throws Exception {
    if (isDiskAvailable()) {
      restClient = new RestClient(new Credentials("", config.getString("token")));
      recreateLocalDir();
      for (String filename : backupFiles) {
        File file = new File(localDir, filename);
        restClient.downloadFile(lastBackupDir + "/" + filename, file, null);
      }
    }
  }

  private boolean isDiskAvailable() {
    return config.hasPath("token");
  }

  private void recreateLocalDir() {
    File localDirFile = new File(localDir);
    File[] files = localDirFile.listFiles();
    if (files != null) {
      Arrays.stream(files).forEach(File::delete);
    }
    localDirFile.mkdir();
  }

  public void upload(boolean isDatabaseChange) throws Exception {
    if ("write".equals(config.getString("mode")) && isDatabaseChange) {
      String newBackupDir = config.getString("dir.backup") + "/"
          + String.valueOf(System.currentTimeMillis());
      restClient.makeFolder(newBackupDir);
      for (String filename : backupFiles) {
        File file = new File(localDir, filename);
        Link link = restClient.getUploadLink(newBackupDir + "/" + filename, false);
        restClient.uploadFile(link, false, file, null);
      }
      restClient.copy(newBackupDir, lastBackupDir, true);
    }
  }
}
