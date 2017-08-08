ooml properties that are not [transient](#Transient properties) can have type declarations. A type declaration specifies what types of values the property can accept. Types go into two categories:

- Primitive types: `natural`, `integer`, `float`, `number`, `string`, `boolean`, and `null`
- Class types: any ooml class, i.e. `OOML.Instance` or any descendant

Some of the primitive types are also part of a third category of types, and that is numeric types:

1. `natural`: any integer greater than or equal to zero
1. `integer`: any whole number
1. `float`: any number that is not `NaN`, `+Infinity`, or `-Infinity`
1. `number`: any JavaScript value that is of type "number" (including `NaN`, `+Infinity`, and `-Infinity`)

These types are all primitive types, and they overlap any other numeric type that is lower in the above list. For example, the `integer` and `number` types overlap the `natural` type. 

To declare the type for a property, use the `type` attribute on the `ooml-property` declaration:

```html
<ooml-property name="aStringProperty" type="string">""</ooml-property>
```

Union types are allowed. Union types are composed of more than one primitive subtypes. They are declared by listing them separated by a bar:

```html
<ooml-property name="aStringOrNaturalProperty" type="string|natural">1.41</ooml-property>
```

Union types cannot have class subtypes. They also cannot have any duplicate or overlapping types.

Since union types can only be composed of primitive subtypes, they are also primitive types themselves. A union type is still interpreted as one atomic type.

If a property does not have a type declaration, it has the default type of `number|string|boolean|null`, i.e. it takes primitive values only.
