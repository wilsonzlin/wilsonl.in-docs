**Properties** are the [fields](https://en.wikipedia.org/wiki/Field_(computer_science)) of a class, sometimes called **instance or member variables, attributes or properties** in other object-orientated languages. They are like properties in JavaScript; they are values attached to an object, and can be accessed and assigned to using the notation `obj.prop` or `obj["prop"]`. OOML introduces more safety when dealing with properties by:

- Requiring properties to be declared, with an initial value, before they can be used
- Allowing type declarations to ensure type safety at runtime
- Preventing the access and assignment of properties that have not been declared

There are two ways to declare properties in OOML. This article will describe the first way, using `ooml-property` tags. The other way, using substitutions in the DOM, is explained in [Substitution](#Substitution).

## Declaring

To declare a property called "myProp" in a class, use an `ooml-property` tag:

```html
<template ooml-class="MyClass">
    <ooml-property name="myProp">null</ooml-property>
</template>
```

The name of the property is declared using the `name` attribute. It is recommended to use camelCase when naming properties. There are restrictions on names for properties and other identifiers — see [Identifiers](#Identifiers) for more details.

## Type system

Properties may have a declared type. Only [primitive types](#Primitives) may be specified. The default value must match the declared type. If there is no declared type, the value can be of any primitive type. To declare a type, use the `type` attribute:

```html
<ooml-property name="myProp" type="natural">1</ooml-property>
```

A union type can be declared, by listing the subtypes separated with a bar. Subtypes can also only be [primitive types](#Primitives). Union types ensure that the value must be one of the subtypes. There is no limit to the amount of subtypes, but there cannot be duplicates.

This property's value can be a `natural`, `boolean` or `string`:

```html
<ooml-property name="myProp" type="natural|boolean|string">true</ooml-property>
```

## Default value

The default value is inferred by evaluating it as JavaScript code. This means that strings must be quoted:

```html
<!-- Valid --!>
<ooml-property name="myProp">"default string"</ooml-property>

<!-- Also valid --!>
<ooml-property name="myProp">'default string'</ooml-property>

<!-- INVALID --!>
<ooml-property name="myProp">default string</ooml-property>
```

Ensure that string values are quoted; there is a slim possibility that OOML cannot pickup that it is invalid, and that is when the default value is a global string variable. In the next example, the default value of `myProp` is `"global string"`, *not* `"oops"`:

```html
<script>
    window.oops = "global string";
</script>
<template ooml-class="MyClass">
    <!-- DO NOT DO THIS -->
    <ooml-property name="myProp">oops</ooml-property>
</template>
```

OOML properties must have a default value. Generally, if you don't have a specific default value, consider `null`. `undefined` is not allowed in almost every part of OOML, including property values — see [Undefined](#Undefined) for more details.

## Events

OOML properties also emit events that extend the functionality of properites. They can be handled using declared inline functions. They can alter or even prevent the behaviour that caused the event, and allow additional side effects when fundamental operations occur.

There are three events:

- `get`: Emitted when a property is accessed. Can be handled to return a custom value.
- `set`: Emitted when a property is assigned to. Can be handled to change the new value, set custom HTML where the property is substituted in the DOM, or prevent the assignment.
- `change`: Emitted when a property's value has changed. The initial assignment of a property value, which always happens during construction of a new instance, also causes this event.

To add a handler for any event, use the appropriate attribute:

```html
<ooml-property name="prop1"
    get="alert('Getting ' + property);"
    set="alert('Setting ' + property);"
    change="alert('The property ' + property + ' has changed');"
>null</ooml-property>
```

# Serialisation

Properties can be suppressed by declaring the boolean attribute `supressed`. Suppressing a property prevents it from being serialised. See more at [Supression](#Supression).
