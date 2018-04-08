Directives are like functions. They have names, arguments, and a return
value.

To make them seamless in code, there is a different way of using them
for each file type. In some file types, there are different ways to
declare a directive to change how its return value is used.

# HTML

## Tag

### Format

1. A regular HTML tag called `zc-name`, where `name` is the directive's
name
1. All arguments except for `value` declared as attributes
1. The value for the argument `value` as its content

```html
<zc-directive arg1="val" arg2="val">
  Value
</zc-directive>
```

### Escapes

Normal HTML escaping:

- Argument values should replace double quotes with representative HTML
entities
- Content should replace chevrons (`<` and `>`) with respective HTML
entities
- Ampersands should be replaced with its equivalent HTML entity (`&amp;`)

### How to avoid special interpretation

Don't use a tag starting with `zc-`, it's not a valid tag; if literal
required, replace `<` with `&lt;`.

### Order of processing:

1. Process attributes as arguments in order declared
1. Directives in attribute value processed sequentially
1. Directives in content (i.e. `zc-*` tags) processed sequentially

Note that values are not decoded first as otherwise `<zc-` and `&zc-`
literals would need double encoding.

## Attribute

### Format

1. `&zc-` followed by the name and an opening parenthesis
1. the name, an equals, and the value for each argument, comma-separated
1. a closing parenthesis and a semicolon

```html
<div id="&zc-directive(arg1=val, arg2=val);"></div>
```

Whitespace is sigificant in a value. The amount of whitespace before and
after an argument's name, however, is not significant.

Values can contain more directives in HTML entity form.

### Escapes

Values do not need to be quoted. Commas, equals, and closing parentheses
in a value need to be replaced with equivalent HTML entities.

Ampersands and double quotes need to be replaced with equivalent HTML
entities whether quoted or not.

### How to avoid special interpretation

Don't use the `&zc;` entity, it's not a valid entity; if literal
required, use `&amp;zc;`.

Note that atttribute directives can be inside the value of an argument
of an attribute directive, so this applies to attribute directive
argument values as well:

```html
<!-- This has two directives, one nested within another -->
<div id="&zc-set(name=&zc-get(name=hello););"></div>

<!-- This has one directive -->
<div id="&zc-set(name=&amp;zc-get(name=hello););"></div>
```

### Order of processing:

1. Process arguments in order declared
1. Directives in argument values processed sequentially after decoding
any valid HTML entities

Note that values are not decoded first as otherwise `<zc-` and `&zc-`
literals would need double encoding.

# CSS

```css
zc-set[name="font"] { content: "Size" }
zc-set[name="font2"] { content: zc-use("font") }
zc-set[name="block"][css-block] {
  rules: go;
  here: 1px;
}

/* Replace entire block */
zc-test-directive[arg1="value"][arg2="value"] {
  content: "Directive value";
}

div {
  /* Replace statement */
  --zc-test: arg1("value" zc-use("font") "test") arg2("value");
  /* Replace property name */
  -zc-test: arg1("value") arg2("value") 1px;
  /* Replace property value */
  src: zc-test("value", "value");
}
```
