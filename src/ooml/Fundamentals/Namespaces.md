Namespaces group together classes and isolate them from classes in other namespaces.

Namespaces are created by initialising a new OOML.Namespace instance with the DOM element containing the ooml class declarations.

Here is an example of a namespace containing two (empty) classes:

```html
<div id="my-namespace">
    <template ooml-class="Class1"></template>
    <template ooml-class="Class2"></template>
</div>
```

To initialise this namespace, the following JavaScript code would be used:

```javascript
let MyNamespace = new OOML.Namespace(document.querySelector("#my-namespace"));
```

By default, if no DOM element is specified, the DOM element used defaults to `document.body` (i.e. the `<body>` tag).

Here are the other ways to call the constructor:

```javascript
let MyNamespace;

// Provide the selector directly
MyNamespace = new OOML.Namespace("#my-namespace");

// Provide the HTML directly (note: the containing element should not be provided)
MyNamespace = new OOML.Namespace(`
    <template ooml-class="Class1"></template>
    <template ooml-class="Class2"></template>
`);

// Use document.body
MyNamespace = new OOML.Namespace();
```

If provided a DOM element, an error will be thrown if an ancestor or descendant of that element was used previously to construct an OOML.Namespace.  

For an app, generally only one namespace is needed.

For libraries, namespaces can be useful as another layer of encapsulation and organisation.

Sometimes, external classes need to be used inside a class in a namespace. To import classes and use them like regular classes, pass an object as the second argument to the OOML.Namespace constructor:

```javascript
let CoolLibrary = new OOML.Namespace("...insert library code here...");

let MyNamespace = new OOML.Namespace(document.body, {
    imports: {
        // The name of the import does not have to be the same as the class's name
        "CL.ClassA": CoolLibrary.classes.CoolClass,
        "CL.ClassB": CoolLibrary.classes.MediocreClass,
    },
});
```

In the second argument, provide a property called `imports`, and make its value an *imports object*. An *imports object* is an object literal, where the keys are the import names, and the values are ooml classes. The import name provided has to be a valid class name, but **does not have to be the same as the name of the class**.

Once imported, the class can be referred to using the import name:

```html
<template ooml-class="MyClass extends CL.ClassA"></template>
```
