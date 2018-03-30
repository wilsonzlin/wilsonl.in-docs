# Stateful compilation

Things to note:

- Deleted articles are not removed from the compiled output.
- Newly created articles in a closer location (e.g. not in a `_common`) will be used because
  they have a newer mtime.
- Changes to a view won't cause recompilation.
- ~~New articles or projects won't appear in precompiled articles, as they have not been recompiled.~~
- ~~References to non-existent articles in precompiled articles are not invalidated.~~
