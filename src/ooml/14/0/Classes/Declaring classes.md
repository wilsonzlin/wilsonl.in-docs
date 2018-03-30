**Classes** are the templates for creating ooml instances. They are very similar to classes in most other object-orientated languages, in that they:

- have properties, methods, and fields
- can be extended, inheriting properties and methods from ancestor classes
- have advanced features like abstract classes, constructors, serialisation and deserialisation, and factory methods, and
- are also JavaScript classes, making it very easy to use them in JavaScript logic.

Classes are declared using HTML `template` tags in the HTML file:

```html
<template ooml-class="MyClass"></template>
```

`<template>` ensures faster processing as browsers that support it will not try to render the contents of it.

Inside the tag, everything is declared:

- up to one [constructor](#Constructors) and one [initialiser](#Initialisation)
- a few tags that describe the [properties](#Declaring properties), [methods](Declaring methods), and [fields](#Declaring fields) of the class
- the [view](#Declaring views) of the class is laid out

Here is an example that contains everything:

```html
<template ooml-class="MyClass">
  <ooml-field name="field1">1</oom-field>

  <ooml-initialiser>
    alert("Hello")
  </ooml-initialiser>

  <ooml-property name="prop1">null</ooml-property>
  <ooml-property name="prop2">null</ooml-property>
  <ooml-property name="prop3">null</ooml-property>

  <ooml-constructor>
    alert("Hello")
  </ooml-constructor>

  <ooml-method name="method1">
    function() {
      alert("Method 1");
    }
  </ooml-method>

  <ooml-method name="method2">
    function() {
      alert("Method 2");
    }
  </ooml-method>

  <div>
    <h1>Instance of my class</h1>
    <em>Hooray!</em>
  </div>
</template>
```

If a class doesn't explicitly declare its parent (i.e. doesn't have `extends` in its `ooml-class` attribute), it implicitly extends `OOML.Instance`. This means that `OOML.Instance` is the base class/type of all ooml classes.
