package ru.fess38.finance.security

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.protobuf.BoolValue
import com.google.protobuf.StringValue
import com.typesafe.config.Config
import org.apache.commons.text.CharacterPredicates
import org.apache.commons.text.RandomStringGenerator
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.model.Model.AccessToken
import ru.fess38.finance.model.Model.RefreshToken
import ru.fess38.finance.model.Model.RefreshToken.AuthType
import ru.fess38.finance.model.Session
import java.time.Duration

@RestController
@RequestMapping(
    path = ["/api"],
    produces = ["application/x-protobuf"],
    consumes = ["application/x-protobuf"]
)
class AuthenticationController {
  @Autowired
  lateinit var config: Config

  @Autowired
  lateinit var googleIdTokenVerifier: GoogleIdTokenVerifier

  @Autowired
  lateinit var userService: UserService

  val tokenGenerator = RandomStringGenerator.Builder()
      .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
      .withinRange(48, 122)
      .build()!!

  @GetMapping("/auth/google-client-id")
  fun googleclientId(): StringValue {
    return StringValue.of(config.getString("security.google.clientId"))
  }

  @PostMapping("/auth")
  fun auth(@RequestBody refreshToken: RefreshToken): AccessToken {
    val authType = refreshToken.type
    val token = refreshToken.value
    when (authType) {
      AuthType.GOOGLE -> {
        val googleIdToken = googleIdTokenVerifier.verify(token) ?:
            throw BadCredentialsException("Invalid token: $token")
        val googleId = googleIdToken.payload.subject
        val accessToken = tokenGenerator.generate(50)
        val expired = System.currentTimeMillis() + Duration.ofDays(90).toMillis()
        val session = Session(token = accessToken, expired = expired)
        userService.save(googleId, authType, session)
        return AccessToken.newBuilder().setValue(accessToken).setExpired(expired).build()
      }
      else -> throw BadCredentialsException("Not supported auth type: $authType")
    }
  }

  @PostMapping("/auth/validate")
  fun validate(@RequestBody accessToken: AccessToken): BoolValue {
    return BoolValue.of(userService.find(accessToken.value) != null)
  }

  @PostMapping("/auth/revoke-token")
  fun revokeToken(@RequestBody accessToken: AccessToken) = userService.revoke(accessToken)
}
