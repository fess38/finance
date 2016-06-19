<html>
<head>
<title>Транзакции</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
    <form name="income-transaction" method="post" action="/transaction/income/add">
        Дата: <input type="date" name="dayRef" required></br>
        Рубрика: <select size="1" name="rubric-id">
        <#list incomeRubrics as rubric>
        <option value="${rubric.id?c}">${rubric.name}</option>
        </#list>
        </select></br>
        Сумма: <input name="amountFrom" type="number" min="1" required></br>
        Пользователь: <select size="1" name="userId">
        <#list users as user_>
            <option value="${user_.id?c}">${user_.name}</option>
        </#list>
        </select></br>
        Комментарий: <input name="comment" type="text" size="25"></br>
        <input type="submit" value="Добавить доход">
    </form>
    -----
    <form name="expense-transaction" method="post" action="/transaction/expense/add">
        Дата: <input type="date" name="dayRef" required></br>
        Рубрика: <select size="1" name="rubric-id">
        <#list expenseRubrics as rubric>
        <option value="${rubric.id?c}">${rubric.name}</option>
        </#list>
        </select></br>
        Сумма: <input name="amountFrom" type="number" min="1" required></br>
        Пользователь: <select size="1" name="userId">
        <#list users as user_>
            <option value="${user_.id?c}">${user_.name}</option>
        </#list>
        </select></br>
        Комментарий: <input name="comment" type="text" size="25"></br>
        <input type="submit" value="Добавить расход">
    </form>
    -----
    <form name="delete-transactoin" method="post" action="/transaction/delete">
        <select size="1" name="id">
        <#list transactions as transaction>
        <option value="${transaction.id?c}">${transaction}</option>
        </#list>
        </select>
        <input type="submit" value="Удалить транзакцию"></p>
    </form>
    -----
    <form name="add-user" method="post" action="/user/add">
        Имя: <input name="name" type="text" size="10" required>
        <input type="submit" value="Добавить пользователя">
    </form>
    -----
    <form name="delete-user" method="post" action="/user/delete">
        <select size="1" name="id">
        <#list users as user_>
        <option value="${user_.id?c}">${user_.id?c}. ${user_.name}</option>
        </#list>
        </select>
        <input type="submit" value="Удалить пользователя"></p>
    </form>
    -----
    <p>Пользователи</p>
    <ul>
    <#list users as user_>
      <li>${user_}</li>
    </#list>
    </ul>
    -----
    <form name="add-rubric" method="post" action="/rubric/add">
        Имя: <input name="name" type="text" size="10" required>
        Тип: <input type="radio" name="isIncome" value="true" checked>Доход
        <input type="radio" name="isIncome" value="false">Расход</br>
        <input type="submit" value="Добавить рубрику">
    </form>
     -----
    <form name="delete-rubric" method="post" action="/rubric/delete">
        <select size="1" name="id">
        <#list incomeRubrics as rubric>
        <option value="${rubric.id?c}">${rubric.name}</option>
        </#list>
        <#list expenseRubrics as rubric>
        <option value="${rubric.id?c}">${rubric.name}</option>
        </#list>
        </select>
        <input type="submit" value="Удалить рубрику"></p>
    </form>
    -----
    <p>Рубрики</p>
    <ul>
    <#list incomeRubrics as rubric>
    <option>${rubric}</option>
    </#list>
    <#list expenseRubrics as rubric>
    <option>${rubric}</option>
    </#list>
    </ul>
</body>
</html>