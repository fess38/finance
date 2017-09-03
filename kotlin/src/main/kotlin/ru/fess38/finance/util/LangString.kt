package ru.fess38.finance.util

import com.google.common.base.Preconditions
import java.util.Locale

data class LangString(val language: String, val value: String) {
  init {
    Preconditions.checkNotNull(value)
  }

  @Transient
  val locale = Locale.forLanguageTag(language)
}
