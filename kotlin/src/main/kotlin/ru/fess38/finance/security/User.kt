package ru.fess38.finance.security

import ru.fess38.finance.core.Model.RefreshToken.AuthType
import ru.fess38.finance.security.Role.WRITE
import javax.persistence.CollectionTable
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Embeddable
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Index
import javax.persistence.JoinColumn
import javax.persistence.SequenceGenerator
import javax.persistence.Table

@Entity
@Table(schema = "model", name = "user")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idseq")
    @SequenceGenerator(name = "idseq", sequenceName = "idseq", allocationSize = 25,
        initialValue = 1000)
    val id: Long = 0,

    @Column(name = "outer_id", nullable = false, updatable = false,
        unique = true, length = 50)
    val outerId: String,

    @Column(name = "auth_type", nullable = false, updatable = false, length = 25)
    @Enumerated(EnumType.STRING)
    val authType: AuthType,

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(schema = "model", name = "user_session",
        joinColumns = [(JoinColumn(name = "user_id"))],
        indexes = [(Index(name = "NIX_user_session", columnList = "user_id, token, expired"))]
    )
    val sessions: List<Session> = listOf()
)

@Embeddable
data class Session(
    @Column(nullable = false, length = 50)
    val token: String,

    @Column(nullable = false)
    val expired: Long = 0,

    @Column(name = "role", nullable = false, updatable = false, length = 10)
    @Enumerated(EnumType.STRING)
    val role: Role = WRITE
)

enum class Role {
  READ,
  WRITE
}
