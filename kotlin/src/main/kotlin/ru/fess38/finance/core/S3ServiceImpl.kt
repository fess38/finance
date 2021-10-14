package ru.fess38.finance.core

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import com.google.protobuf.StringValue
import com.typesafe.config.Config
import mu.KotlinLogging
import org.apache.commons.codec.binary.Base64
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.io.InputStream
import java.util.*

@Service
class S3ServiceImpl : S3Service {
  private val log = KotlinLogging.logger {}

  @Autowired
  lateinit var config: Config

  @Autowired
  lateinit var s3Client: AmazonS3

  override fun save(image: StringValue): StringValue {
    val bucket = config.getString("s3.bucket")
    val key = UUID.randomUUID().toString()
    val bytes = Base64.decodeBase64(image.value.substring(image.value.indexOf(",") + 1).toByteArray())
    val metadata = ObjectMetadata()
    metadata.contentLength = bytes.size.toLong()
    metadata.contentType = "image/jpeg"
    ByteArrayInputStream(bytes).use {
      s3Client.putObject(bucket, key, it, metadata)
      val url = "https://${config.getString("s3.endpoint")}/${bucket}/${key}"
      log.info {"Save [image] to ${url}"}
      return StringValue.newBuilder().setValue(url).build()
    }
  }
}
