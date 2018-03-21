A **scope** determines the accessibility of variables declared within it. [Chunks](#Chunks) have their own scope, as well as several control flow blocks. If a variable is declared within a scope, it can only be used inside that scope, which includes any nested scopes. It cannot be accessed or assigned to outside that scope.

An example of chunk scoping:

```nanoscript
"Assume this is in a file called one.ns"

create one as 1
```

```nanoscript
"Assume this is in a file called two.ns"
from `one.ns` import *

"This fails, as even though one.ns is imported, `one` is scoped to one.ns and can only be used in that file"
create two as one + one
```
