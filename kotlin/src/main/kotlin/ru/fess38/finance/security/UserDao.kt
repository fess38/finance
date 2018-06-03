package ru.fess38.finance.security

import ru.fess38.finance.core.Model.RefreshToken.AuthType

interface UserDao {
  fun save(user: User)

  fun update(user: User)

  fun find(token: String): User?

  fun find(outerId: String, authType: AuthType): User?
}
