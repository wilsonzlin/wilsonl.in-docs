**Classes** are fundamental to object orientated languages. They describe a type, its associated functionality, and what values it holds.

To use them, objects of its type are constructed according to the class's constructor. That object holds values in its member variables.

The class defines what the object's variables are, but each object has their own independent value.

The class defines special functions that can access the object's variables.

The class can also define what happens when objects of its type are used as part of an operation, as well as when something tries to access or assign to non-existent member variables of the object.

There are three different types of classes:

- [**Virtual classes**](#Virtual class): Every value type except objects and classes have predefined members and operation implementations. They are defined abstractly on their equivalent virtual class, but these classes cannot be used as a parent of another class or constructor for an object.
- [**Built-in classes**](#Built-in class): These classes are predefined by the specification and must exist. For performance, their implementation code is usually not written in nanoscript. Otherwise, they are normal classes that can be used as a parent and can construct objects from.
- [**User-defined classes**](#User-defined class): Classes defined using [class statements](#Class value).
