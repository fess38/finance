UPDATE ${accountTable}
SET amount = (
  SELECT a.amount
  FROM (
         SELECT t.id, SUM(t.amount) amount
         FROM (
                SELECT -amountFrom amount, accountFromId id
                FROM ${transactionTable}
                WHERE isDeleted = FALSE
                UNION ALL
                SELECT amountTo amount, accountToId id
                FROM ${transactionTable}
                WHERE isDeleted = FALSE
                UNION ALL
                SELECT 0 amount, accountFromId id
                FROM ${transactionTable}
                WHERE isDeleted = TRUE
                UNION ALL
                SELECT 0 amount, accountToId id
                FROM ${transactionTable}
                WHERE isDeleted = TRUE
              ) t
         GROUP BY t.id
       ) a
  WHERE a.id = ${accountTable}.id
)
WHERE isDeleted = FALSE AND EXISTS(
    SELECT 1
    FROM (
           SELECT accountFromId id
           FROM ${transactionTable}
           UNION ALL
           SELECT accountToId id
           FROM ${transactionTable}
         ) a
    WHERE a.id = ${accountTable}.id
);
