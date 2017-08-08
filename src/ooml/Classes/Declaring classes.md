**Classes** are the templates for creating ooml instances. They are very similar to classes in most other object-orientated languages:

- They have properties and methods
- Classes can be extended, inheriting properties and methods from ancestor classes
- Advanced features like abstract classes, constructors, serialisation and deserialisation, and factory methods are available
- They are also JavaScript classes, making it very easy to use them in JavaScript logic

Classes are declared using HTML templates in the HTML file:

```html
<template ooml-class="MyClass"></template>
```

`<template>` elements ensure faster processing as browsers that support it will not try to render the contents.

Inside the template element, there are a few tags that describe the [properties](#Declaring properties) and [methods](#Using methods) of the class, and then the view of the class is laid out:

```html
<template ooml-class="MyClass">
    <ooml-property name="prop1">null</ooml-property>
    <ooml-property name="prop2">null</ooml-property>
    <ooml-property name="prop3">null</ooml-property>
    
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

If a class doesn't explicitly declare its parent (i.e. doesn't have `extends` in its `ooml-class` tag), it implicitly extends `OOML.Instance`. This means that `OOML.Instance` is the base class/type of all ooml classes.
