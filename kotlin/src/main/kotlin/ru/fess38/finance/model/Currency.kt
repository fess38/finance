package ru.fess38.finance.model

import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import ru.fess38.finance.util.LangString
import ru.fess38.finance.util.ListLangStringType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.SequenceGenerator
import javax.persistence.Table

@Entity
@Table(schema = "model", name = "currency")
@TypeDefs(TypeDef(name = "listLangString", typeClass = ListLangStringType::class))
data class Currency(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idseq")
    @SequenceGenerator(name = "idseq", sequenceName = "idseq")
    val id: Long = 0,

    @Column(columnDefinition = "jsonb", nullable = false)
    @Type(type = "listLangString")
    val names: List<LangString> = listOf(),

    @Column(columnDefinition = "varchar(1)", nullable = false)
    val symbol: String,

    @Column(columnDefinition = "varchar(3)", nullable = false)
    val code: String
)
