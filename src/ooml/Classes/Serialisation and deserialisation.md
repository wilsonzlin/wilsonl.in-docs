All [OOML.Instance](#OOML.Instance) and [OOML.Array](#OOML.Array) objects can represent their entire data structure and values as JSON.

## Serialising

Serialising is as simple as calling the `.toJSON` method on the object:

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

## Deserialising

Deserialising is also just as easy. Simply parse the serialised JSON into a JavaScript object or array, and then do one of the following:

### Use the `.assign` method

The `.assign` method (available on every ooml instance) and pass in the deserialised object, to assign every property's value in the deserialised object to the ooml instance (similar to JavaScript's `Object.assign`).

### Manually create an instance or array

Construct a new ooml instance or array from the deserialised object or array, by passing it as an argument (see [OOML.Instance](#OOML.Instance) or [OOML.Array](#OOML.Array))
- Assign the deserialised object or array to an ooml instance's property
