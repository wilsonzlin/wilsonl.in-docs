All properties have a default value. A default value is inferred by evaluating the contents of the `ooml-property` tag as JavaScript code. This means that strings must be quoted:

```html
<!-- Valid -->
<ooml-property name="myProp">"default string"</ooml-property>

<!-- Also valid -->
<ooml-property name="myProp">'default string'</ooml-property>

<!-- INVALID -->
<ooml-property name="myProp">default string</ooml-property>
```

Ensure that string values are quoted; there is a slim possibility that ooml cannot pickup that it is invalid, and that is when the default value is a global string variable. In the next example, the default value of `myProp` is `"global string"`, *not* `"oops"`:

```html
<script>
    window.oops = "global string";
</script>
<template ooml-class="MyClass">
    <!-- DO NOT DO THIS -->
    <ooml-property name="myProp">oops</ooml-property>
</template>
```

ooml properties must have a default value. Generally, if you don't have a specific default value in mind, consider `null`, `0`, `false`, or `""`.
