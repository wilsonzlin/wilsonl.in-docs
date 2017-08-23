Namespaces group together classes and isolate them from classes in other namespaces. Namespaces are declared by an HTML tag that contains ooml [class](#Declaring classes) and [instantiation](#Initial instantiations) declarations.

For an app, generally only one namespace is needed.

For libraries, namespaces can be useful as another layer of encapsulation and organisation.

Here is an example of a namespace containing two (empty) classes:

```html
<div id="my-namespace">
    <template ooml-class="Class1"></template>
    <template ooml-class="Class2"></template>
</div>
```

Declaring classes are not covered here; see [Declaring classes](#Declaring classes).

A namespace is required to use ooml, as there is no way to declare classes by themselves. As such, they play a simple but core part of ooml.
