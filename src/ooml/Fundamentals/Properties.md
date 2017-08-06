**Properties** are the [fields](https://en.wikipedia.org/wiki/Field_%28computer_science%29) of a class, sometimes called **instance or member variables, attributes or properties** in other object-orientated languages. They are like properties in JavaScript; they are values attached to an object, and can be accessed and assigned to using the notation `obj.prop` or `obj["prop"]`. ooml introduces more safety when dealing with properties by:

- Requiring properties to be declared, with an initial value, before they can be used
- Allowing type declarations to ensure type safety at runtime
- Preventing the assignment of properties that have not been declared

## Declaring

To declare a property called "myProp" in a class, use an `ooml-property` tag:

```html
<template ooml-class="MyClass">
    <ooml-property name="myProp">null</ooml-property>
</template>
```

The name of the property is declared using the `name` attribute. It is recommended to use camelCase when naming properties. There are restrictions on names for properties and other identifiers — see [Identifiers](#Identifiers) for more details.

## Type checking

Properties may have a declared type. Only [primitive types](#Primitives) and ooml classes may be specified. The default value must match the declared type. If there is no declared type, the value can be of any primitive type. To declare a type, use the `type` attribute:

```html
<ooml-property name="myProp" type="natural">1</ooml-property>
```

A union type can be declared, by listing the subtypes separated with a bar. Subtypes can only be [primitive types](#Primitives). Union types ensure that the value must be one of the subtypes. There is no limit to the amount of subtypes, but there cannot be duplicates or overlaps.

This property's value can be a `natural`, `boolean` or `string`:

```html
<ooml-property name="myProp" type="natural|boolean|string">true</ooml-property>
```

## Default value

The default value is inferred by evaluating it as JavaScript code. This means that strings must be quoted:

```html
<!-- Valid -->
<ooml-property name="myProp">"default string"</ooml-property>

<!-- Also valid -->
<ooml-property name="myProp">'default string'</ooml-property>

<!-- INVALID -->
<ooml-property name="myProp">default string</ooml-property>
```

Ensure that string values are quoted; there is a slim possibility that ooml cannot pickup that it is invalid, and that is when the default value is a global string variable. In the next example, the default value of `myProp` is `"global string"`, *not* `"oops"`:

```html
<script>
    window.oops = "global string";
</script>
<template ooml-class="MyClass">
    <!-- DO NOT DO THIS -->
    <ooml-property name="myProp">oops</ooml-property>
</template>
```

ooml properties must have a default value. Generally, if you don't have a specific default value in mind, consider `null`. `undefined` is not allowed in almost every part of ooml, including property values — see [Undefined](#Undefined) for more details.

## Events

ooml properties also emit events that extend the functionality of properites. They can be handled using declared methods on the class. They can alter or even prevent the behaviour that caused the event, and allow additional side effects when fundamental operations occur.

There are three events:

- `get`: Emitted when a property is accessed. Can be handled to return a custom value.
- `set`: Emitted when a property is assigned to. Can be handled to change the new value, set custom HTML where the property is substituted in the DOM, or prevent the assignment.
- `change`: Emitted when a property's value has changed. The initial assignment of a property value, which always happens during construction of a new instance, also causes this event.

To set a handler for any event, use the appropriate attribute:

```html
<ooml-method name="getProp1">
    function(property) {
        alert(`Getting ${ property }`);
    }
</ooml-method>

<ooml-method name="setProp1">
    function(property) {
        alert(`Setting ${ property }`);
    }
</ooml-method>

<ooml-method name="onChangeProp1">
    function(property) {
        alert(`The property ${ property } has changed`);
    }
</ooml-method>

<ooml-property name="prop1"
    get="this.getProp1"
    set="this.setProp1"
    change="this.onChangeProp1"
>null</ooml-property>
```

## Serialisation

Properties can be prevented from being included in the JSON by declaring the boolean attribute `transient`. Marking a property as transient allows it to have any type of value (except `undefined`). See more at [Transient properties](#Transient properties).


```html
<ooml-property name="transientProperty" transient>null</ooml-property>
```
