package ru.fess38.finance.core

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import com.google.protobuf.StringValue
import com.typesafe.config.Config
import mu.KotlinLogging
import org.apache.commons.codec.binary.Base64
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.fess38.finance.core.Model.File
import java.io.ByteArrayInputStream
import java.util.*

@Service
class S3ServiceImpl : S3Service {
  private val log = KotlinLogging.logger {}

  @Autowired
  lateinit var config: Config

  @Autowired
  lateinit var s3Client: AmazonS3

  override fun save(file: File): StringValue {
    val bucket = config.getString("s3.bucket")
    var key = UUID.randomUUID().toString()
    if (file.extension.isNotEmpty()) {
      key += ".${file.extension}"
    }
    val bytes = Base64.decodeBase64(file.data.substring(file.data.indexOf(",") + 1).toByteArray())
    val metadata = ObjectMetadata()
    metadata.contentLength = bytes.size.toLong()
    metadata.contentType = file.contentType
    ByteArrayInputStream(bytes).use {
      s3Client.putObject(bucket, key, it, metadata)
      val url = "https://${config.getString("s3.endpoint")}/${bucket}/${key}"
      log.info {"Save [${file.contentType}] to $url"}
      return StringValue.newBuilder().setValue(url).build()
    }
  }
}
