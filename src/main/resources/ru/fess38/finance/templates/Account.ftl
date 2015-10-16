<html>
<head>
  <meta charset="UTF-8">
  <title>Счета</title>
</head>
<body>
<#include "Header.ftl">

<h3>Добавить новый счет</h3>

<form action="${accountPath}" method="post">
  Название: <input type="text" required name="name" width="20"/><br/> Валюта:
  <select name="currencyId">
  <#list currencies as currency>
    <option value="${currency.id}">${currency.name} (${currency.symbol})
    </option>
  </#list>
  </select><br/> <input type="submit" name="create" value="Добавить"/>
</form>

<#if accounts?has_content>
<h3>Удалить счет</h3>

<form action="${accountPath}" method="post">
  <select name="deleteEntityId">
      <#list accounts as acсount>
        <option value="${acсount.id?c}">
          ${acсount.id?c}. ${acсount.name} (${acсount.currency.symbol})
        </option>
      </#list>
  </select> <input type="submit" name="delete" value="Удалить"/>
</form>

<h3>Список счетов</h3>
<table border="1px">
  <tr>
    <th>ID</th>
    <th>Название</th>
    <th>Валюта</th>
    <th>Сумма</th>
  </tr>
    <#list accounts as acсount>
      <tr>
        <td>${acсount.id?c}</td>
        <td>${acсount.name}</td>
        <td>${acсount.currency.name}</td>
        <td>${acсount.amount}</td>
      </tr>
    </#list>
</table>
</#if>

</body>
</html>
