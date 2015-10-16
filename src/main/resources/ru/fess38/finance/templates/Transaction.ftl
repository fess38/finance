<html>
<head>
  <meta charset="UTF-8">
  <title>Транзакции</title>
  <script type="text/javascript">
    function checkAccounts() {
      var form = document.forms["accountTransfer"];
      var accountFromId = form["accountFromId"].value;
      var accountToId = form["accountToId"].value;
      if (accountFromId == accountToId) {
        window.alert("Счета для перевода - одинаковые!");
        return false;
      } else {
        return true;
      }
    }
  </script>
</head>
<body>
<#include "Header.ftl">

<div>
  <h3>Список транзакций</h3>
  <table border="1px">
    <tr>
      <th>ID</th>
      <th>Рубрика</th>
      <th>Дата</th>
      <th>Списано со счета</th>
      <th>Сумма списания</th>
      <th>Переведено на счет</th>
      <th>Сумма получения</th>
      <th>Пользователь</th>
      <th>Группа транзакций</th>
      <th>Комментарий</th>
    </tr>
  <#list transactions as transaction>
    <tr>
      <td>${transaction.id?c}</td>
      <td>${transaction.rubric.name}</td>
      <td>${transaction.dayRef?string["dd.MM.yyyy"]}</td>
      <td>${transaction.accountFrom.name}</td>
      <td>${transaction.amountFrom}</td>
      <td>${transaction.accountTo.name}</td>
      <td>${transaction.amountTo}</td>
      <td><#if transaction.user??>${transaction.user.name}</#if></td>
      <td><#if transaction.transactionGroup??>${transaction.transactionGroup.name}</#if></td>
      <td>${transaction.comment!}</td>
    </tr>
  </#list>
  </table>
</div>

<div>
  <h3>Добавить доход</h3>

  <form action="${transactionPath}" method="post">
    <div>
      <span>Дата:</span>
      <input type="datetime" name="dayRef" value="${today?date}"
          pattern="\d{2}\.\d{2}\.\d{4}" title="DD.MM.YYYY"/>
    </div>

    <div>
      <span>Рубрика:</span>
      <select name="rubricId">
      <#list incomeRubrics?sort_by("name") as rubric>
        <option value="${rubric.id?c}">${rubric.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Счет дохода:</span>
      <select name="accountToId">
      <#list accounts as account>
        <option value="${account.id?c}">${account.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Сумма дохода:</span>
      <input type="number" required min="1" name="amountTo"/>
    </div>

    <div>
      <span>Пользователь:</span>
      <select name="userId">
        <option/>
      <#list users?sort_by("name") as user>
        <option value="${user.id?c}">${user.getName()}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Группа транзакций:</span>
      <select name="transactionGroupId">
        <option></option>
      <#list transactionGroups?sort_by("name") as transactionGroup>
        <option
            value="${transactionGroup.id?c}">${transactionGroup.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Комментарий:</span>
      <input type="text" name="comment"/>
    </div>

    <input type="submit" name="create" value="Добавить"/>

  </form>
</div>

<div>
  <h3>Добавить расход</h3>

  <form action="${transactionPath}" method="post">

    <div>
      <span>Дата:</span>
      <input type="datetime" name="dayRef" value="${today?date}"
          pattern="\d{2}\.\d{2}\.\d{4}" title="DD.MM.YYYY"/>
    </div>

    <div>
      <span>Рубрика:</span>
      <select name="rubricId">
      <#list expenceRubrics?sort_by("name") as rubric>
        <option value="${rubric.id?c}">${rubric.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Счет расхода:</span>
      <select name="accountFromId">
      <#list accounts as account>
        <option value="${account.id?c}">${account.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Сумма расхода:</span>
      <input type="number" required min="1" name="amountFrom"/>
    </div>

    <div>
      <span>Пользователь:</span>
      <select name="userId">
        <option></option>
      <#list users?sort_by("name") as user>
        <option value="${user.id?c}">${user.getName()}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Группа транзакций:</span>
      <select name="transactionGroupId">
        <option></option>
      <#list transactionGroups?sort_by("name") as transactionGroup>
        <option
            value="${transactionGroup.id?c}">${transactionGroup.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Комментарий:</span>
      <input type="text" name="comment"/>
    </div>

    <input type="submit" name="create" value="Добавить"/>
  </form>
</div>

<div>
  <h3>Перевод между счетами</h3>

  <form name="accountTransfer" action="${transactionPath}" method="post"
      onsubmit="return checkAccounts()">

    <div>
      <span>Дата:</span>
      <input type="datetime" name="dayRef" value="${today?date}"
          pattern="\d{2}\.\d{2}\.\d{4}" title="DD.MM.YYYY"/>
    </div>

    <div hidden="true">
      <select name="rubricId">
        <option value="${accountTransferRubricId}"></option>
      </select>
    </div>

    <div>
      <span>Счет 1:</span>
      <select name="accountFromId">
      <#list accounts as account>
        <option value="${account.id?c}">${account.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Счет 2:</span>
      <select name="accountToId">
      <#list accounts as account>
        <option value="${account.id?c}">${account.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Сумма отправить:</span>
      <input type="number" required min="1" name="amountFrom"/>
    </div>

    <div>
      <span>Сумма получить:</span>
      <input type="number" required min="1" name="amountTo"/>
    </div>

    <div>
      <span>Пользователь:</span>
      <select name="userId">
        <option></option>
      <#list users?sort_by("name") as user>
        <option value="${user.id?c}">${user.getName()}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Группа транзакций:</span>
      <select name="transactionGroupId">
        <option></option>
      <#list transactionGroups?sort_by("name") as transactionGroup>
        <option
            value="${transactionGroup.id?c}">${transactionGroup.name}</option>
      </#list>
      </select>
    </div>

    <div>
      <span>Комментарий:</span>
      <input type="text" name="comment"/>
    </div>

    <input type="submit" name="create" value="Добавить""/>
  </form>
</div>

<div>
  <h3>Удалить транзакцию</h3>

  <form action="${transactionPath}" method="post">
    <select name="deleteEntityId">
    <#list transactions as transaction>
      <option value="${transaction.id?c}">${transaction.id?c}</option>
    </#list>
    </select>
    <input type="submit" name="delete" value="Удалить"/>
  </form>
</div>
</body>
</html>
