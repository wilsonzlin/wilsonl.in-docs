ooml is a JavaScript frontend UI library.

It is designed to easily create very complex UIs using modular, encapsulated code, in a manner similar to object orientation.

With many web apps today, allowing for a good user experience often requires code that is asynchronous and intertwined, managing state for the UI as well as data that must synchronise with the server. As apps grow in complexity, this becomes more and more difficult, ultimately increasing the likelihood of bugs and unforeseen corner-case behaviours.

ooml tries to apply the principles of object orientation, which works very well in dealing with huge, highly-complex programs, to the UI. The app is split into [classes](#Declaring classes), which have [properties](#Declaring properties), [methods](#Using methods), and a [view](#Declaring views), that allow it to maintain its own state and deal with itself only, making it easier to improve, replace, and build on top of. Strict rules around scope, typing and inter-class communication decreases bugs and enforces modularity.

ooml does all of this while still being a single, drop-in JavaScript library. There is no required environment or development process, and it only uses plain HTML and JavaScript. Read more at [Core principles](#Core principles).
