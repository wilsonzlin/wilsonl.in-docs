Normally, when inheriting a class, the view of the parent class is not inherited in any way, shape, or form. However, this can be allowed, by declaring an **extension point** on the parent class's view:

```html
<template ooml-class="ParentClass">
    <div>
        <h1>ParentClass's view</h1>
        <!-- Here's the extension point tag -->
        <ooml-extension-point></ooml-extension-point>  
    </div>
</template>
```

Now, when classes inherit *ParentClass* (i.e. `extend ParentClass`), a copy of *ParentClass*'s view will be copied to the child class, and then the child class's view will go into the copied view, at the `<ooml-extension-point>` tag position:

```html
<template ooml-class="ChildClass extends ParentClass">
    <p>
        This is ChildClass's view.
    </p>
    
    <!--
        ChildClass's **actual** view is:
        
        <div>
            <h1>ParentClass's view</h1>
            <p>
                This is ChildClass's view.
            </p>
        </div>
    -->
</template>
```

Essentially, the child class's view is wrapped around the parent class's view, instead of being on its own.

The child class's view still has the same limitations as a normal view. These limitations are described at [Views](#Views).
