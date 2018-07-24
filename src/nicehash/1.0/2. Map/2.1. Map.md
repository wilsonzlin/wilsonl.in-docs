|Base type|Key type|Description|File|
|---|---|---|---|
|`int32`|`uint32_t`|32-bit integers, signed or unsigned|`src/main/c/set/int32.h`|
|`int64`|`uint64_t`|64-bit integers, signed or unsigned|`src/main/c/set/int64.h`|
|`str`|`char *`|Strings (character arrays)|`src/main/c/set/str.h`|

|Name|Value|
|---|---|
|`BASE_TYPE`|Base type|
|`VALUE_TYPE_NAME`|Valid identifier representing the value type| 
|`TYPE`|`BASE_TYPE` + `_` + `VALUE_TYPE_NAME`|
|`KEY_T`|Key type|
|`VALUE_T`|Value type|
