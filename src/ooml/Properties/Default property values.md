All properties have a default value. It is used as the value for a property when creating a new instance of an ooml class, if no value for that property is provided in the [initial state](#Initial state). A default value is inferred by evaluating the contents of the `ooml-property` tag as JavaScript code.

ooml properties must have a default value. Generally, if you don't have a specific default value in mind, consider `null`, `0`, `false`, or `""`. The default value must be compatible with the [type](#Typing) of the property.

## Primitive default values

Examples of primitive default values:

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

Because the value is inferred by evaluating the tag contents as JavaScript, strings must be proper JavaScript strings (i.e. quoted, properly escaped, and on a single line) **and** HTML text data (i.e. HTML escaped):

```html
<!-- INVALID -->
<ooml-property name="myProp">default string</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">"default string"</ooml-property>

<!-- INVALID -->
<ooml-property name="myProp">"And they said, "let there be light""</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">"And they said, \"let there be light\""</ooml-property>

<!-- INVALID -->
<ooml-property name="myProp">"C:\Windows\system32\"</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">"C:\\Windows\\system32\\"</ooml-property>

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

<!-- INVALID -->
<ooml-property name="myProp">"The HTML4 & HTML5 tag for paragraphs is <p />"</ooml-property>
<!-- Should be -->
<ooml-property name="myProp">"The HTML4 &amp; HTML5 tag for paragraphs is &lt;p /&gt;"</ooml-property>
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

## Instance and array default values
