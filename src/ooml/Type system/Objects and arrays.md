Only object literals count as the `Object` type in OOML. Object literals are, put simply, objects created with the braces syntax `{}`. Technically, they must have a JavaScript type of `"object"`, and either have the `Object` built-in as their constructor, or have no prototype.

OOML.Array instances do not count as the `Array` type in ooml, nor are they subclasses of the native JS `Array`:

```javascript
let normalArr = [];
console.assert(normalArr instanceof Array === true);
console.assert(Array.isArray(normalArr) === true);

let oomlArr = new OOML.Array();
console.assert(oomlArr instanceof Array === false);
console.assert(Array.isArray(oomlArr) === false);
```
