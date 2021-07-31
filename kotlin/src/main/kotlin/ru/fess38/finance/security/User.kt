package ru.fess38.finance.security

import ru.fess38.finance.IDSEQ_ALLOCATION_SIZE
import ru.fess38.finance.core.Model.RefreshToken.AuthType
import ru.fess38.finance.security.Role.WRITE
import javax.persistence.*

@Entity
@Table(schema = "model", name = "user")
data class User(
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idseq")
  @SequenceGenerator(
    name = "idseq", sequenceName = "model.idseq", allocationSize = IDSEQ_ALLOCATION_SIZE,
    initialValue = 1000
  )
  val id: Long = 0,

  @Column(name = "outer_id", nullable = false, updatable = false, unique = true, length = 50)
  val outerId: String,

  @Column(name = "auth_type", nullable = false, updatable = false)
  @Enumerated(EnumType.ORDINAL)
  val authType: AuthType,

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(
    schema = "model", name = "user_session",
    joinColumns = [(JoinColumn(name = "user_id"))],
    indexes = [(Index(name = "UIX_user_session", columnList = "user_id, token, expired", unique = true))]
  )
  val sessions: List<Session> = listOf()
)

@Embeddable
data class Session(
  @Column(nullable = false, length = 50)
  val token: String,

  @Column(nullable = false)
  val expired: Long = 0,

  @Column(name = "role", nullable = false, updatable = false)
  @Enumerated(EnumType.ORDINAL)
  val role: Role = WRITE
)

enum class Role {
  READ,
  WRITE
}
