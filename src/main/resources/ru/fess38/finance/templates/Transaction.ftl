<html>
<head>
    <meta charset="UTF-8">
    <title>Транзакции</title>
</head>
<body>
<#include "Header.ftl">

<h3>Добавить новую транзакцию</h3>

<form action="transactions" method="post">
    Рубрика:
    <select name="rubricId">
    <#list rubrics as rubric>
        <option value="${rubric.id?c}">${rubric.name}</option>
    </#list>
    </select><br/>
    Дата:
    <input type="datetime" name="dayRef" value="${today?date}"
           pattern="\d{2}\.\d{2}\.\d{4}" title="DD.MM.YYYY"/><br/>
    Счет 1:
    <select name="accountIdFrom">
    <#list accounts as account>
        <option value="${account.id?c}">${account.name}</option>
    </#list>
    </select><br/>
    Сумма со счета 1: <input type="number" required min="1" name="amountFrom" /><br/>
    Счет 2:
    <select name="accountIdTo">
    <#list accounts as account>
        <option value="${account.id?c}">${account.name}</option>
    </#list>
    </select><br/>
    Сумма на счет 2: <input type="number" required min="1" name="amountTo" /><br/>
    Пользователь:
    <select name="userId">
        <option/>
    <#list users as user>
        <option value="${user.id?c}">${user.name}</option>
    </#list>
    </select><br/>
    Группа транзакций:
    <select name="transactionGroupId">
        <option/>
    <#list transactionGroups as transactionGroup>
        <option value="${transactionGroup.id?c}">${transactionGroup.name}</option>
    </#list>
    </select><br/>
    Использовать для статистики?
    <input type="radio" name="isUseForStat" value="true" checked>Да
    <input type="radio" name="isUseForStat" value="false">Нет<br/>
    Комментарий: <input type="text" name="comment" /><br/>
    <input type="submit" name="create" value="Добавить"/>
</form>

<#if transactions?has_content>

<h3>Удалить </h3>

<form action="transactions" method="post">
    <select name="delete">
        <#list transactions as transaction>
            <option value="${transaction.id?c}">${transaction.id?c}</option>
        </#list>
    </select>
    <input type="submit" value="Удалить"/>
</form>

<h3>Список транзакций</h3>
<table border="1px">
    <tr>
        <th>ID</th>
        <th>Рубрика</th>
    </tr>
    <#list transactions as transaction>
        <tr>
            <td>${transaction.id?c}</td>
            <td>${transaction.rubric.name}</td>
        </tr>
    </#list>
</table>

</#if>
</body>
</html>
