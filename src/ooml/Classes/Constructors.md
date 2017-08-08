Constructors are special methods that are called automatically when creating a new instance. They can be declared by declaring a method called "constructor" on a class:

```html
<template ooml-class="A">
    <ooml-method name="constructor">
        function() {
            console.log("Hello from A");
        }
    </ooml-method>
</template>
```

The return value of the constructor is not used and discarded, so it can return anything.

The `this` special variable is available inside the method, just like any other method, and refers to the newly-instantiated OOML instance. It has all declared and inherited properties and methods, and all properties have their values set to [default](#Default property values) or [initial state](#Initial state) values.

The first and only argument passed into the constructor method is the constructor of the closest ancestor with a constructor. If such a constructor exists, it can be called with no arguments:

```html
<template ooml-class="B extends A">
    <ooml-method name="constructor">
        function(parent) {
            /*
            
                The output from these two lines will be:
                
                Hello from A
                Hello from B
                
            */
            parent();
            console.log("Hello from B");
        }
    </ooml-method>
</template>
```

If no ancestor class has a constructor, `parent` will be `undefined`, and calling it will cause a `TypeError`.

This is similar to `super` in JavaScript and some other languages, although:

- Calling `parent` with arguments is the same as calling `parent` with no arguments (i.e. `parent` does not take arguments)
- The argument is a regular argument, not a special keyword or reference
- The parameter cannot be called `super` as that is a reserved keyword in JavaScript
- It can be called anywhere inside the constructor, and any amount of times (including not at all)
- The `this` value of the function cannot be changed, whether through `.call`, `.apply`, or `.bind`.

For example, this is completely legal:

```html
<template ooml-class="C extends A">
    <ooml-method name="constructor">
        function(ahoyMeHarties) {
            ahoyMeHarties();
            console.log("Hello from C");
            ahoyMeHarties();
        }
    </ooml-method>
</template>
```

Just like any other method, there may only be one constructor per class.
