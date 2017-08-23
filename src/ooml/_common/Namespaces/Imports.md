Sometimes, external classes need to be used inside a namespace. To import classes and use them like regular classes, pass an object as the second argument to the OOML.Namespace constructor:

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

Once imported, the class can be referred to using the import name. For example, to use it as the parent of some class:

```html
<template ooml-class="MyClass extends CL.ClassA"></template>
```
