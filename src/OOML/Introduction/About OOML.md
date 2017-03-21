OOML is a JavaScript front-end UI library.

It was born in late 2016, as the UI library for [etyude](https://etyude.com), as other libraries at the time were too unfriendly or bloated, or required specialised, complicated development.

It is designed to easily create very complex UIs using modular components, in a manner similar to object orientation.

With many web apps today, allowing for a good user experience often requires code that is asynchronous and intertwined, managing state for the UI as well as data that must synchronise with the server. As apps grow in complexity, this becomes more and more difficult, ultimately increasing the likelihood of bugs and weird edge-case behaviours.

OOML tries to apply the principles of object orientation, which works very well in dealing with huge, highly-complex programs, to the UI. The app is split into classes, which have properties, attributes and methods that allow it to maintain its own state and deal with itself only, making it easier to improve, replace and build on top of. Strict rules around scope, typing and inter-object communication decreases bugs and enforces modularity.

OOML does all of this while still being a single, drop-in JavaScript library. There is no required environment or development process, and it only uses plain HTML and JavaScript. Read more at [Core principles](#Core principles).

OOML can be compared to the likes of React, Angular and Vue.js.
