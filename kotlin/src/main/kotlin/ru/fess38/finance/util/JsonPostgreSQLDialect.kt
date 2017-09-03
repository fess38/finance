package ru.fess38.finance.util

import org.hibernate.dialect.PostgreSQL94Dialect
import org.hibernate.engine.spi.SessionImplementor
import org.hibernate.usertype.UserType
import org.postgresql.util.PGobject
import ru.fess38.finance.AppConfiguration
import ru.fess38.finance.fromJson
import java.io.Serializable
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.sql.Types
import java.util.Objects

class JsonPostgreSQLDialect: PostgreSQL94Dialect() {
  init {
    this.registerColumnType(Types.JAVA_OBJECT, "json")
  }
}

class ListLangStringType: UserType {
  private val gson = AppConfiguration().gson()

  override fun nullSafeSet(st: PreparedStatement, value: Any, index: Int,
                           session: SessionImplementor?) {
    st.setObject(index, gson.toJson(value), Types.OTHER)
  }

  override fun nullSafeGet(rs: ResultSet,names: Array<out String>, session: SessionImplementor?,
                           owner: Any?): List<LangString> {
    return gson.fromJson((rs.getObject(names[0]) as PGobject).value)
  }

  override fun assemble(cached: Serializable, owner: Any?): List<LangString> {
    return gson.fromJson(cached as String)
  }

  override fun disassemble(value: Any): String = gson.toJson(value)
  override fun hashCode(x: Any) = Objects.hashCode(x)
  override fun equals(x: Any, y: Any) = x == y
  override fun deepCopy(value: Any) = (value as List<LangString>).toList()
  override fun replace(original: Any, target: Any?, owner: Any?) = deepCopy(original)
  override fun returnedClass() = List::class.java
  override fun isMutable() = false
  override fun sqlTypes() = intArrayOf(Types.JAVA_OBJECT)
}
