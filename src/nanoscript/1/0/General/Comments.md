Comments are ignored by the interpreter. They are usually for human consumption only, and designed to describe and clarify code in a human language.

Comments start and end with an identical amount of quote (`"`) characters. Any characters in between, including line terminators, are considered part of the comment and not code.

Here are some examples of comments:

```nanoscript
"Here is a comment"

"It can span
multiple lines"

"""
You can use more than one quote character
to start and end a comment, but it must be
the same at the start and end.
"""

""Using multiple quotes is useful if you plan
on using quotes (") in your comment.""

set x to 2 """""""Comments can be anywhere""""""" * 5
```
