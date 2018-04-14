# Finance

**Finance** - это приложение для ведения личных финансов.
Оно позволяет:
- записывать доходы и расходы,
- создавать собственные категории для транзакций,
- привязывать транзакции к определенным людям,
- проставлять тэги для более сложной группировки транзакций,
- создавать счета в различных валютах и переводы между ними.

# Установка с помощью maven
```bash
mvn clean package
java -jar target/finance-0.0.1.jar
```

# Переменные для запуска
* **token** - токен от Яндекс.Диска, используется для резервного копирования данных (при ```mode=write```) и скачивания актуальной версии данных из Яндекс.Диска при запуске приложения
* **mode** - переменная, определяющая будет ли сохранена текущая версия данных на Яндекс.Диск. Запись будет производиться при значении *write*
* **password** - пароль для доступа к данным через веб-интерфейс. Значение по умолчанию - *password*

Пример использования переменных:
```
java -Dmode=write -Dtoken=AQBBBBBLm0ibAAOJKqFH7TtUYUPtuQVpIZBkAhd -Dpassword=qwerty -jar target/finance-0.0.1.jar
```
Подробнее про получение токена для Яндекс.Диска можно прочитать [здесь](https://tech.yandex.ru/disk/rest/)

Протестировать приложение можно [здесь](https://fess38-test.herokuapp.com/login#/) (пароль - *password*)