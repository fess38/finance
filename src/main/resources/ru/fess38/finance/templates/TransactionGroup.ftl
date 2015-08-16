<html>
<head>
    <meta charset="UTF-8">
    <title>Группы транзакций</title>
</head>
<body>
<#include "Header.ftl">

<h3>Добавить новую группу транзакций</h3>

<form action="transactionGroups" method="post">
    Название:
    <input type="text" required name="name" width="20"/>
    <input type="submit" name="create" value="Добавить"/>
</form>

<#if transactionGroups?has_content>

<h3>Удалить пользователя</h3>
<form action="transactionGroups" method="post">
    <select name="delete">
        <#list transactionGroups as transactionGroup>
            <option value="${transactionGroup.id?c}">${transactionGroup.id?c}. ${transactionGroup.name}</option>
        </#list>
    </select>
    <input type="submit" value="Удалить"/>
</form>

<h3>Список групп транзакций</h3>
<table border="1px">
    <tr>
        <th>ID</th>
        <th>Название</th>
    </tr>
    <#list transactionGroups as transactionGroup>
        <tr>
            <td>${transactionGroup.id?c}</td>
            <td>${transactionGroup.name}</td>
        </tr>
    </#list>
</table>

</#if>
</body>
</html>