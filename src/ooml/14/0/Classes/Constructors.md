Constructors are special functions that are called automatically when creating a new instance. They can be declared like so:

```html
<template ooml-class="A">
  <ooml-constructor>
    console.log("Hello from A");
  </ooml-constructor>
</template>
```

It is not allowed to return anything.

**Note that the meaning of "constructor" here is not the same as "constructor" in JavaScript.** Declaring this method does not make it the constructor of the JavaScript class that represents the the ooml class.

The `this` special variable is available inside the constructor, and refers to the newly-instantiated ooml instance. It has all declared and inherited properties and methods, and all properties have their values set to [default](#Default property values) or [initial state](#Initial state) values.

Another special variable available is `parent`. It refers to the constructor of the closest ancestor with a constructor. If such a constructor exists, it can be called with no arguments:

```html
<template ooml-class="B extends A">
  <ooml-method name="constructor">
      /*
        The output from these two lines will be:

        Hello from A
        Hello from B
      */
      parent();
      console.log("Hello from B");
  </ooml-method>
</template>
```

If no ancestor class has a constructor, `parent` will be `undefined`, and calling it will cause a `TypeError`.

This is similar to `super` in JavaScript and some other languages, although:

- Calling `parent` with arguments is the same as calling `parent` with no arguments (i.e. `parent` does not take arguments).
- The argument is a regular variable, not a special keyword or reference.
- The parameter cannot be called `super` as that is a reserved keyword in JavaScript.
- It can be called anywhere inside the constructor, and any amount of times (including not at all).
- The `this` value of the function cannot be changed, whether through `.call`, `.apply`, or `.bind`.

There may only be one constructor per class.
