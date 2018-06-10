package ru.fess38.finance.security

import ru.fess38.finance.core.Model.RefreshToken.AuthType

interface UserRepository {
  fun getAll(): List<User>

  fun save(user: User): User

  fun update(user: User)

  fun find(token: String): User?

  fun find(outerId: String, authType: AuthType): User?
}
