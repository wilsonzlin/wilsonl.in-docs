ooml is compatible with all modern browsers, and Internet Explorer version 9 and above.

ooml has built-in polyfills for features missing in the browser (detected using feature detection). They are optimised for ooml so it is recommended to load ooml before loading any polyfills (e.g. *es6-shim* or *core-js*). Recommended browsers are ones that support:

- [Data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)
- [Set](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)
- [<template>](https://developer.mozilla.org/en/docs/Web/HTML/Element/template)
