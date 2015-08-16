<html>
<head>
    <meta charset="UTF-8">
    <title>Пользователи</title>
</head>
<body>
<#include "Header.ftl">

<h3>Добавить нового пользователя</h3>

<form action="users" method="post">
    Имя:
    <input type="text" required name="name" width="20"/>
    <input type="submit" name="create" value="Добавить"/>
</form>

<#if users?has_content>

<h3>Удалить пользователя</h3>
<form action="users" method="post">
    <select name="delete">
        <#list users as user>
            <option value="${user.id?c}">${user.id?c}. ${user.name}</option>
        </#list>
    </select>
    <input type="submit" value="Удалить"/>
</form>

<h3>Список пользователей</h3>
<table border="1px">
    <tr>
        <th>ID</th>
        <th>Имя пользователя</th>
    </tr>
    <#list users as user>
        <tr>
            <td>${user.id?c}</td>
            <td>${user.name}</td>
        </tr>
    </#list>
</table>

</#if>
</body>
</html>