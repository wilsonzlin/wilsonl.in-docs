All [OOML.Instance](#OOML.Instance) and [OOML.Array](#OOML.Array) objects can represent their entire data structure and values as JSON.

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
