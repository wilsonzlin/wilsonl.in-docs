An **identifier** is the name given to a property, method, or class.

There are limitations on what an identifier can be.

An identifier cannot:

- start with two underscores
- end with an underscore
- cannot start with a dollar sign (`$`, ASCII 36)
- start or end with whitespace
- have no characters
- be one of the following:
    - `constructor`
    - `hasOwnProperty`
    - `isPrototypeOf`
    - `propertyIsEnumerable`
    - `toLocaleString`
    - `toString`
    - `valueOf`
    - `toObject`
    - `toJSON`
    - `assign`
    - `on`
    - `detach`
    - `attributes`
    - `namespace`
    - `handle`
    - `keys`

Additionally, a **class identifier**:

- must start with an English alphabet character (i.e. a character from `a` to `z`), lower or upper case
    - this is defined by the regular expression `[a-zA-Z]`
- must only consist of English alphabet, digit (i.e. a character from `0` to `9`), and dot (`.`, ASCII 46) characters
    - this is defined by the regular expression `[a-zA-Z.0-9]`
- cannot be:
    - `null`
    - `number`
    - `boolean`
    - `string`
    - `natural`
    - `integer`
    - `float`
