package ru.fess38.finance.security

import ru.fess38.finance.core.Model.AccessToken
import ru.fess38.finance.core.Model.RefreshToken.AuthType

interface UserService {
  fun save(outerId: String, authType: AuthType, session: Session)

  fun find(token: String): User?

  fun find(outerId: String, authType: AuthType): User?

  fun findByContext(): User

  fun revoke(accessToken: AccessToken)
}
