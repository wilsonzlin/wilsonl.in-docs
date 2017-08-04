Abstract classes have two differences compared to regular classes:

- Instances cannot be constructed from them
- A view is *not* required (but it can have one)

Abstract classes are typically used for creating a base class for subclasses to extend from, implementing the common traits between them to reduce repetition, and giving them a common base type.

They are declared by using `ooml-abstract-class` instead of `ooml-class`:

```html
<template ooml-abstract-class="BaseClass"></template>
```

Abstract classes can be used as a property's type. However, this poses a dilemma: when unserialising, how can ooml know what regular class to construct using only the plain JSON object data? This is where [factory methods](#Factory methods) come into play.

For more on extending classes, see [Inheritance](#Inheritance).
