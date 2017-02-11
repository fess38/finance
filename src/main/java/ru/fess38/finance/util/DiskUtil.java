package ru.fess38.finance.util;

import com.typesafe.config.Config;
import com.yandex.disk.rest.Credentials;
import com.yandex.disk.rest.ResourcesArgs;
import com.yandex.disk.rest.RestClient;
import com.yandex.disk.rest.json.Link;
import com.yandex.disk.rest.json.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class DiskUtil {
  public DiskUtil(Config config) {
    this.config = config;
  }

  private final Logger log = LoggerFactory.getLogger(DiskUtil.class);
  private final Config config;
  private RestClient restClient;

  public void download() throws Exception {
    if (hasToken()) {
      emptyLocalRoot();
      restClient = new RestClient(new Credentials("", token()));
      makeFolderWithoutException(remoteRoot());
      makeFolderWithoutException(remoteBackup());
      makeFolderWithoutException(remoteLastBackup());
      if (hasRemoteBackupFiles()) {
        for (File file : localBackupFiles()) {
          String downloadPath = String.format("%s/%s", remoteLastBackup(), file.getName());
          restClient.downloadFile(downloadPath, file, null);
        }
      }
    }
  }

  private void emptyLocalRoot() {
    File localRoot = new File(localRoot());
    File[] files = localRoot.listFiles();
    if (files != null) {
      Arrays.stream(files).forEach(File::delete);
    }
    localRoot.mkdir();
  }

  private boolean hasRemoteBackupFiles() throws Exception {
    ResourcesArgs resourcesArgs = new ResourcesArgs.Builder().setPath(remoteLastBackup()).build();
    return !restClient.getResources(resourcesArgs).getResourceList().getItems().isEmpty();
  }

  public void upload(boolean isDatabaseChange) throws Exception {
    if (hasToken() && "write".equals(mode()) && isDatabaseChange) {
      String newBackupDir = String.format("%s/%s", remoteBackup(), System.currentTimeMillis());
      makeFolderWithoutException(newBackupDir);
      for (File file : localBackupFiles()) {
        String uploadPath = String.format("%s/%s", newBackupDir, file.getName());
        Link link = restClient.getUploadLink(uploadPath, false);
        restClient.uploadFile(link, false, file, null);
      }
      restClient.copy(newBackupDir, remoteLastBackup(), true);
      deleteOldBackups();
    }
  }

  private void makeFolderWithoutException(String path) {
    try {
      restClient.makeFolder(path);
    } catch (Exception e) {
      log.info("Remote directory already exists: {}", path);
    }
  }

  private void deleteOldBackups() {
    try {
      ResourcesArgs resourcesArgs = new ResourcesArgs.Builder().setPath(remoteBackup()).build();
      List<Resource> backups = restClient.getResources(resourcesArgs).getResourceList().getItems();
      List<Resource> backupsToDelete = backups.stream()
          .sorted(Comparator.comparing(Resource::getCreated).reversed())
          .skip(10)
          .collect(Collectors.toList());
      for (Resource backup : backupsToDelete) {
        restClient.delete(backup.getPath().getPath(), true);
      }
    } catch (Exception e) {
      log.warn("Delete old backups error: {}", e.getMessage());
    }
  }

  private boolean hasToken() {
    return config.hasPath("token");
  }

  private String token() {
    return config.getString("token");
  }

  private String mode() {
    return config.getString("mode");
  }

  private List<String> backupFiles() {
    return config.getStringList("backup-files");
  }

  private String localRoot() {
    return config.getString("local.root");
  }

  private List<File> localBackupFiles() {
    return backupFiles().stream()
        .map(x -> String.format("%s/%s", localRoot(), x))
        .map(File::new)
        .collect(Collectors.toList());
  }

  private String remoteRoot() {
    return config.getString("remote.root");
  }

  private String remoteBackup() {
    return config.getString("remote.backup");
  }

  private String remoteLastBackup() {
    return config.getString("remote.last-backup");
  }
}
