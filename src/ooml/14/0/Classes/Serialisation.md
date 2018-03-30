Serialising an [OOML.Instance](#OOML.Instance) or [OOML.Array](#OOML.Array) is as simple as calling the `.toJSON` method on it:

```javascript
let SomeClass = new OOML.Namespace(`
  <template ooml-class="AnotherClass">
    <ooml-property name="x" type="float">0.0</ooml-property>
    <ooml-property name="y" type="AnotherClass" array>[]</ooml-property>
    <ooml-property name="z" type="boolean|string">""</ooml-property>
  </template>

  <template ooml-class="SomeClass">
    <ooml-property name="a" type="natural">0</ooml-property>
    <ooml-property name="b" type="string">""</ooml-property>
    <ooml-property name="c" type="boolean">false</ooml-property>
    <ooml-property name="d">null</ooml-property>
    <ooml-property name="e" type="SomeClass">null</ooml-property>
    <ooml-property name="f" type="AnotherClass" array>null</ooml-property>
  </template>
`).classes.SomeClass;

let anInstanceOfSomeClass = new SomeClass({
  a: 1,
  b: "some string",
  c: true,
  d: null,
  e: {
    a: 42,
    b: "another string",
  },
  f: [
    {
      x: Math.PI,
      y: null,
      z: false,
    },
    {
      x: Math.E,
      y: [],
      z: "string",
    },
  ],
});

let serialisedInstance = anInstanceOfSomeClass.toJSON();
let serialisedArray = anInstanceOfSomeClass.f.toJSON();
let anotherSerialisedInstance = anInstanceOfSomeClass.f.get(0).toJSON();
```

# Custom behaviour

To define what happens when an instance of some class is serialised, declare a [special method](#Special methods) on the class called `serialise`:

```html
<template ooml-class="InputControl">
  <ooml-property name="value" type="string">""</ooml-property>

  <ooml-method name="serialise">
    function () {
      return this.value;
    }
  </ooml-method>

  <input value="{{ this.value }}">
</template>
```

The method must return a primitive value.
