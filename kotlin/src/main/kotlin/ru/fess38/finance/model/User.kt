package ru.fess38.finance.model

import javax.persistence.Column
import javax.persistence.Entity
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

    @Column(name = "outer_id", columnDefinition = "TEXT", updatable = false, nullable = false,
        unique = true)
    val outerId: String
)
