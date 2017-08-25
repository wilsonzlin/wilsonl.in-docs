After a namespace has been declared, the next step is for it to be parsed, otherwise it's just some plain text in some weird tags.

Namespaces are created by initialising a new `OOML.Namespace` instance with the DOM element containing the ooml class declarations.

Here is an example of a namespace containing two (empty) classes:

```html
<div id="my-namespace">
    <template ooml-class="Class1"></template>
    <template ooml-class="Class2"></template>
</div>
```

To initialise the above example namespace, the following JavaScript code would be used:

```javascript
let MyNamespace = new OOML.Namespace(document.querySelector("#my-namespace"));
```

By default, if no DOM element is specified (i.e. if the first argument is not provided), the DOM element used defaults to `document.body` (i.e. the `<body>` tag).

Here are the other ways to call the constructor:

```javascript
let MyNamespace;

// Provide the selector directly
MyNamespace = new OOML.Namespace("#my-namespace");

// Provide the HTML directly (note: the container tag should not be provided)
MyNamespace = new OOML.Namespace(`
    <template ooml-class="Class1"></template>
    <template ooml-class="Class2"></template>
`);

// Use document.body by default
MyNamespace = new OOML.Namespace();
```

If a DOM element is provided, an error will be thrown if an ancestor or descendant of that element was used previously to construct an ooml namespace.
