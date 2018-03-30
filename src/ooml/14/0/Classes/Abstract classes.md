Abstract classes have two differences compared to regular classes:

- Instances cannot be constructed from them.
- A view is not required (but it can have one).

Abstract classes are typically used for creating a base class for subclasses to extend from, implementing the common traits between them to reduce repetition, and giving them a common base type.

They are declared by using `ooml-abstract-class` instead of `ooml-class`:

```html
<template ooml-abstract-class="BaseClass"></template>
```

For more on extending classes, see [Inheritance](#Inheritance).

Abstract classes can be used as a property's type. However, this poses a dilemma: when unserialising, how can ooml know what regular class to construct using only the plain JSON object data? This is where factories come into play.

# Factories

A factory is a [special field](#Special fields) that is called when creating an instance of an abstract class. Since it's not possible to create such an instance, an abstract class will check if it has a field called `factory` and that field is a function. If so, it provides whatever the return value of calling it with the initial state is. This means that the factory function is tasked with returning an instance of a regular class so that the problem is avoided.

Here is an example:

```html
<template ooml-abstract-class="Thing">
  <ooml-field name="factory">
    function (initState) {
      switch (initState.type) {
      case "person": return new this.namespace.classes.Person(initState);
      case "car": return new this.namespace.classes.Car(initState);
      }
    }
  </ooml-field>

  <ooml-property name="type">null</ooml-property>
</template>

<template ooml-class="Person extends Thing">
  <ooml-property name="type">"person"</ooml-property>
  <ooml-property name="name">null</ooml-property>
  <ooml-property name="age">null</ooml-property>
  <ooml-property name="gender">null</ooml-property>
</template>

<template ooml-class="Car extends Thing">
  <ooml-property name="type">"car"</ooml-property>
  <ooml-property name="make">null</ooml-property>
  <ooml-property name="model">null</ooml-property>
  <ooml-property name="mileage">null</ooml-property>
</template>
```

Using factories, it's possible to assign a plain object to a property with an abstract class as its type. Instead of constructing an instance of an abstract class, which is impossible, the factory will intervene and provide an instance of a regular class.
