All [data types](#Data type) have **operations** that can be executed on their type of data. These include:

|Operation|Parameters|Result data type|Description|
|---|---|---|---|
|Access|Member|Any|Access a member of data|
|Assign to|Member, Value||Assign value to a member of data|
|Look up|Terms|Any|Look up provided terms in data|
|Update|Terms|Any|Update associated data of terms in data|
|Call|Arguments|Any|Call data with provided arguments|
|Measure||Any|Measure data|
|Exponentiate|Other data|Any|Exponentiate data by other data|
|Multiply|Other data|Any|Multiply data by other data|
|Divide|Other data|Any|Divide data by other data|
|Modulo|Other data|Any|Modulo data by other data|
|Add|Other data|Any|Add other data to data|
|Subtract|Other data|Any|Subtract other data from data|
|Check contents|Value|Boolean|Check if data contains value|
|Test emptyness||Boolean|Check if data is empty|
|Test identity|Other data|Boolean|Check if data and other data refer to the same data|
|Test equality|Other data|Boolean|Test if data is equal to other data|
|Compare|Other data|Number|Compare data to other data|
|Test ancestry|Type|Boolean|Check if data is a descendant of a type|
|Iterate||Iterator|Provide an iterator|
|Represent||String|Convert data to a string value|
|Serialise||Any|Represent data as a primitive or serialisable value|

All data types except objects implement some or all of these operations according to the official specifications, and their implementation cannot be changed. Objects [define their own](#Object operation implementation) implementations of operations.

Operations are executed with operation expressions and involves an [operator](#Operator) and one or more operands. For example:

```nanoscript
create a as 1 + 2
set a to `hello` + `world`
a * 2
```

In the above example, `1 + 2`, `` `hello` + `world` ``, and `a * 2` are all operation expressions.

Attempting to use an operator on data that is not supported by its type will cause an `UnsupportedOperationError`.
