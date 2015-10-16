<html>
<head>
    <meta charset="UTF-8">
    <title>Рубрики</title>
</head>
<body>
<#include "Header.ftl">

<h3>Добавить новую рубрику</h3>

<form action="${rubricPath}" method="post">
    Название:
    <input type="text" required name="name" width="20"/>
    <input type="radio" name="isIncome" value="true" checked>Доход
    <input type="radio" name="isIncome" value="false">Расход<br/>
    <input type="submit" name="create" value="Добавить"/>
</form>

<#if rubrics?has_content>

<h3>Удалить рубрику</h3>

<form action="${rubricPath}" method="post">
    <select name="deleteEntityId">
        <#list rubrics as rubric>
            <option value="${rubric.id?c}">
                ${rubric.id?c}. ${rubric.name}
            </option>
        </#list>
    </select>
    <input type="submit" name="delete" value="Удалить"/>
</form>

<h3>Список рубрик</h3>
<table border="1px">
    <tr>
        <th>ID</th>
        <th>Рубрика</th>
        <th>Доход</th>
    </tr>
    <#list rubrics as rubric>
        <tr>
            <td>${rubric.id?c}</td>
            <td>${rubric.name}</td>
            <td>${rubric.isIncome?string("Да", "Нет")}</td>
        </tr>
    </#list>
</table>

</#if>
</body>
</html>
