# Object functions

If a function is declared with a first parameter name of `self` and no type, then the function can be invoked from any objects of the class type (i.e. it becomes a [member function](#Member) of the objects). The first parameter will be implicitly provided with the object itself, so only the remaining parameters need to be provided. For example:

These are known as **object functions**. Note that `self` is a reserved keyword, so it is not possible to name a parameter `self` any other way. Also, these functions can still be called from the class, but the first parameter must be provided and it must be an object of the class type.
