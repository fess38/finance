SELECT COUNT(*)
FROM (
  SELECT rubricId id
  FROM ${transactionTable}
  WHERE isDeleted = FALSE
  UNION ALL
  SELECT accountFromId
  FROM ${transactionTable}
  WHERE isDeleted = FALSE
  UNION ALL
  SELECT accountToId
  FROM ${transactionTable}
  WHERE isDeleted = FALSE
  UNION ALL
  SELECT userId
  FROM ${transactionTable}
  WHERE isDeleted = FALSE
  UNION ALL
  SELECT transactionGroupId
  FROM ${transactionTable}
  WHERE isDeleted = FALSE
  ) t
WHERE t.id = ?
