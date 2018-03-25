All properties have a default value. It is used as the value for a property when creating a new instance of an ooml class, if no value for that property is provided in the [initial state](#Initial state). A default value is inferred by evaluating the contents of the `ooml-property` tag as JavaScript code.

ooml properties must have a default value. Generally, if you don't have a specific default value in mind, consider `null`, `0`, `false`, or `""`. The default value must be compatible with the [type](#Typing) of the property.

# Primitive default values

Only properties with a [primitive type](#Typing) can have a non-null primitive default value. Examples of primitive default values are:

```html
<ooml-property name="myProp">null</ooml-property>
<ooml-property name="myProp">"abracadabra"</ooml-property>
<ooml-property name="myProp">true</ooml-property>
<ooml-property name="myProp">42</ooml-property>
<ooml-property name="myProp">3354e232</ooml-property>
<ooml-property name="myProp">0.1</ooml-property>
<ooml-property name="myProp">-0.000324325</ooml-property>
<ooml-property name="myProp">-Infinity</ooml-property>
```

Because the value is inferred by evaluating the tag contents as JavaScript, strings must be proper JavaScript strings (i.e. quoted, properly escaped, and on a single line) **and** HTML text data (i.e. HTML entity escaped):

```html
<!-- INVALID -->
<ooml-property name="myProp">default string</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">"default string"</ooml-property>
```

```html
<!-- INVALID -->
<ooml-property name="myProp">"And they said, "Hello, world!""</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">"And they said, \"Hello, world!\""</ooml-property>
```

```html
<!-- INVALID -->
<ooml-property name="myProp">"C:\Windows\system32\"</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">"C:\\Windows\\system32\\"</ooml-property>
```

```html
<!-- INVALID -->
<ooml-property name="myProp">"
    Roses are red
    Violets are blue
    Insert rest of quote
    here
"</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">`
    Roses are red
    Violets are blue
    Insert rest of quote
    here
`</ooml-property>
<!-- Alternatively -->
<ooml-property name="myProp">
    "Roses are red\n" +
    "Violets are blue\n" +
    "Insert rest of quote\n" +
    "here"
</ooml-property>
```

```html
<!-- INVALID -->
<ooml-property name="myProp">"Are 4 & 5 < 6?"</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">"Are 4 &amp; 5 &lt; 6?"</ooml-property>
```

Ensure that string values are quoted; there is a slim possibility that ooml cannot pickup that it is invalid, and that is when the default value is the name of global variable. In the next example, the default value of `myProp` is `"global string"`, *not* `"oops"`:

```html
<script>
    window.oops = "global string";
</script>
<template ooml-class="MyClass">
    <!-- DO NOT DO THIS -->
    <ooml-property name="myProp">oops</ooml-property>
</template>
```

# Instance and array default values

Only properties with a class type can declare their default values as object or array literals. Their default values can also be null. The default value can be thought of as the default [inital state](#Initial state) of the property's instance or array.

In the below example, if no array is provided as `items` in the initial state when creating a new instance of `List`, the `items` property of the new instance will be an array containing three `Item` instances with placeholder names:
```html
<template ooml-class="Item">
    <ooml-property name="name" type="string">""</ooml-property>
</template>

<template ooml-class="List">
    <ooml-property name="name" type="string">""</ooml-property>
    <ooml-property array name="items" type="Item">[
        { name: "Placeholder 1" },
        { name: "Placeholder 2" },
        { name: "Placeholder 3" },
    ]</ooml-property>
</template>
```

Similarly, in the below example, if no instance is provided as `list` in the initial state when creating a new `App`, the new instance will automatically create a `List` instance with a generic name. Since no `items` property is declared in the default value of `list`, the list will have the three placeholder items (see previous example):
```html
<template ooml-class="App">
    <ooml-property name="list" type="List">{
        name: "My list 1",
    }</ooml-property>
</template>
```