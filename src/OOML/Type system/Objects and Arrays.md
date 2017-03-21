Only object literals count as the `Object` type in OOML. Object literals are, put simply, objects created with the braces syntax `{}`. Technically, they must have a type of `"object"`, and either have the `Object` built-in as their constructor, or have no prototype.

OOML.Array instances do not count as the `Array` type in OOML, nor are they subclasses of the native `Array` built-in:

```javascript
let normalArr = [];
console.log(normalArr instanceof Array == true);
console.log(Array.isArray(normalArr) == true);

let oomlArr = new OOML.Array();
console.log(oomlArr instanceof Array == false);
console.log(Array.isArray(oomlArr) == false);
```
