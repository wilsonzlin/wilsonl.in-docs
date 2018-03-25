nanoscript prefers **PascalCase** for names of types and **snake_case** for everything else. There are no recommendations or enforcement around indentation. Whitespace characters are not significant in nanoscript's syntax.

Unlike some other languages, nanoscript avoids the use of statement terminators (e.g. semicolons in C-like languages) and curly braces for code blocks. Outside of calls and grouping, parentheses are rarely used. The terminators of code blocks match the name of the block's type (e.g. `while` and `endwhile`, `for` and `endfor`, `fn` and `endfn`); this makes it easier to identify the block and its purpose when the beginning is not visible.

Perhaps most different about nanoscript is that it uses keywords to declare and assign to variables.

Throughout this documentation, the names of data types, operators, and operations are not proper nouns and so are not capitalised. The only exception is when referring to the virtual classes of data types, which are class names and therefore proper nouns. All built-in classes have **PascalCase** names.
