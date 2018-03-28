The largest unit of source code in nanoscript is the **chunk**. A chunk is simply a sequence of statements and any comments in raw source code (i.e. text) form. The interpreter goes character by character, parsing any valid code into expressions and statements and evaluating them, while ignoring comments.

This "sequence of statements" can be from anywhere -- it's not relevant to the interpreter. It could be a whole or part of a file on a disk, the text in a text control in a GUI app, or the stream of characters being typed into a live interpreter running in a terminal session.

Example of a chunk of code, stored in a file called *hello-world.ns*:

```nanoscript
print("Hello world")
```

A chunk has its own [scope](#Scope). Even when used as a module, a chunk's variables are only visible to code within the chunk, and cannot be accessed or modified anywhere else. [Exports](#Exporting) can be used to share state and functionality outside the chunk as a [module](#Module).
