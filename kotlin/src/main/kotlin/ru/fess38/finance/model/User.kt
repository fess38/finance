package ru.fess38.finance.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.SequenceGenerator
import javax.persistence.Table

@Entity
@Table(schema = "model", name = "user")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idseq")
    @SequenceGenerator(name = "idseq", sequenceName = "idseq")
    val id: Long = 0,

    @Column(name = "outer_id", updatable = false, nullable = false,
        unique = true, length = 50)
    val outerId: String,

    @Column(updatable = false, nullable = false, length = 25)
    @Enumerated(EnumType.STRING)
    val type: UserType = UserType.UNKNOWN
)

enum class UserType {
  GOOGLE,
  FACEBOOK,
  VK,
  UNKNOWN
}
