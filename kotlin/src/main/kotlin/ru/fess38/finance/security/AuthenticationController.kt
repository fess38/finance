package ru.fess38.finance.security

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.typesafe.config.Config
import org.apache.commons.text.CharacterPredicates
import org.apache.commons.text.RandomStringGenerator
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.UserDao
import ru.fess38.finance.model.Session
import java.time.Duration

@RestController
class AuthenticationController {
  @Autowired
  lateinit var config: Config

  @Autowired
  lateinit var googleIdTokenVerifier: GoogleIdTokenVerifier

  @Autowired
  lateinit var userDao: UserDao

  val tokenGenerator = RandomStringGenerator.Builder()
      .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
      .withinRange(48, 122)
      .build()!!

  @RequestMapping("/api/auth/google-client-id", method = arrayOf(RequestMethod.GET))
  fun googleclientId(): Map<String, String> {
    return mapOf(Pair("value", config.getString("security.google.clientId")))
  }

  @RequestMapping("/api/auth", method = arrayOf(RequestMethod.POST))
  fun auth(@RequestBody refreshToken: RefreshToken): Session {
    val authType = refreshToken.type
    val token = refreshToken.token
    when (authType) {
      AuthType.GOOGLE -> {
        val googleIdToken = googleIdTokenVerifier.verify(token) ?:
            throw BadCredentialsException("Invalid token: $token")
        val googleId = googleIdToken.payload.subject
        val accessToken = tokenGenerator.generate(50)
        val expired = System.currentTimeMillis() + Duration.ofDays(90).toMillis()
        val session = Session(accessToken, expired = expired)
        userDao.saveOrUpdate(googleId, authType, session)
        return session
      }
      else -> throw BadCredentialsException("Not supported auth type: $authType")
    }
  }

  @RequestMapping("/api/auth/validate", method = arrayOf(RequestMethod.POST))
  fun validate(@RequestBody refreshToken: RefreshToken): Any {
    return mapOf(Pair("success", userDao.find(refreshToken.token) != null))
  }
}

data class RefreshToken(val token: String, val type: AuthType = AuthType.UNKNOWN)
