Inheritance is achieved in ooml by using the `extends` syntax when declaring the class's name:

```html
<template ooml-class="SomeClass extends ParentClass"></template>
```

When ooml parses this, it will copy the parent class's properties to this class. Properties can be overriden on the child class, but there are rules:

- If the parent property has a primitive type, the child property's type must have the exact same type.
- If the parent property has a class type, the child property's type must be the same class or a descendant.
- If the parent property is an [array](#Array properties), [transient](#Transient properties), or [attribute](#Attribute properties) property, the child property must be the same.

Since ooml classes are also JavaScript classes, method inheritance uses normal JavaScript prototype chaining, and is subject to the same rules and behaviour.

To override a property or method, just declare it again:

```html
<template ooml-class="ParentClass">
    <ooml-property name="prop">"value"</ooml-property>
    
    <ooml-method name="method">
        function() {
            console.log("From ParentClass");
        }
    </ooml-property>
</template>

<template ooml-class="ChildClass extends ParentClass">
    <ooml-property name="prop">3.14</ooml-property>
    
    <ooml-method name="method">
        function() {
            console.log("From ChildClass");
        }
    </ooml-property>
</template>
```

The view of a class can also be inherited — see [View extension](#View extension) for more details.
