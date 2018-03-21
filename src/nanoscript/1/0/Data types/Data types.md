There are several data types in nanoscript. These are:

- Boolean
- Callable
- Class
- Iterator
- List
- Map
- Null
- Number
- Object
- String

These are the core types in nanoscript. Every data is one of these types, but can also be other types due to object orientation; see [Type hierarchy](#Type hierarchy).

All data types have operations that can be performed on their type of data. These include:

|Operation|Parameters|Result data type|Description|
|---|---|---|---|
|Iterate||Iterator|Provide an iterator|
|Add|Other data|Any|Add other data to data|
|Subtract|Other data|Any|Subtract other data from data|
|Multiply|Other data|Any|Multiply data by other data|
|Divide|Other data|Any|Divide data by other data|
|Exponentiate|Other data|Any|Exponentiate data by other data|
|Modulo|Other data|Any|Modulo data by other data|
|Measure||Any|Measure data|
|Test equality|Other data|Boolean|Test if data is equal to other data|
|Compare|Other data|Number|Compare data to other data|
|Test ancestry|Type|Boolean|Check if data is a descendant of a type|
|Call|Arguments|Any|Call data with provided arguments|
|Look up|Terms|Any|Look up provided terms in data|
|Update|Terms|Any|Update associated data of terms in data|
|Access|Member|Any|Access a member of data|
|Assign|Member, Value|N/A|Assign value to a member of data|
|Convert to boolean||Boolean|Convert data to a boolean value|
|Convert to string||String|Convert data to a string value|

All data types except objects implement some or all of these operations according to the official specifications, and cannot be changed.

Operations are done by using [operators](#Operators).
