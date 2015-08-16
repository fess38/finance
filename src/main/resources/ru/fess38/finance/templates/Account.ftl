<html>
<head>
    <meta charset="UTF-8">
    <title>Счета</title>
</head>
<body>
<#include "Header.ftl">

<h3>Добавить новый счет</h3>

<form action="accounts" method="post">
    Название:
    <input type="text" required name="name" width="20"/><br/>
    Валюта:
    <select name="currencyId">
    <#list currencies as currency>
        <option value="${currency.id}">
            ${currency.name} (${currency.symbol})
        </option>
    </#list>
    </select><br/>
    <input type="radio" name="isCredit" value="true" checked>Кредитный
    <input type="radio" name="isCredit" value="false">Дебетовый<br/>
    <input type="submit" name="create" value="Добавить"/>
</form>

<#if accounts?has_content>

<h3>Удалить счет</h3>

<form action="accounts" method="post">
    <select name="delete">
        <#list accounts as acсount>
            <option value="${acсount.id?c}">
                ${acсount.id?c}. ${acсount.name} (${acсount.currency.symbol})
            </option>
        </#list>
    </select>
    <input type="submit" value="Удалить"/>
</form>

<h3>Список счетов</h3>
<table border="1px">
    <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Тип</th>
        <th>Валюта</th>
        <th>Сумма</th>
        <th>Состояние</th>
    </tr>
    <#list accounts as acсount>
        <tr>
            <td>${acсount.id?c}</td>
            <td>${acсount.name}</td>
            <td>${acсount.isCredit?string("Кредитный", "Дебетовый")}</td>
            <td>${acсount.currency.name}</td>
            <td>${acсount.amount}</td>
            <td>${acсount.isClosed?string("Закрыт", "Открыт")}</td>
        </tr>
    </#list>
</table>

</#if>
</body>
</html>
