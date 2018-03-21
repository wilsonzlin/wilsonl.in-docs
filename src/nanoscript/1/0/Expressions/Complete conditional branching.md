Conditional branching can also be done as an expression (for the relevant statements, see [Conditional branching](#Conditional branching)). However, since all expressions must evaluate to some value (i.e. have a result), all branches must be implemented, hence why it's called **complete conditional branching**.

The syntax is exactly the same as the normal `if` statement, but usually the entire expression is placed on one line. See the following example:

```nanoscript
create cond_1 as true
create cond_2 as false

create res_1 as 1
create res_2 as 2
create res_3 as 3

create val as 2 ^ (if cond_1: res_1 elif cond_2: res_2 else: res_3 endif)
```

In the above example, `val` is equal to `2`. `cond_1`, `cond_2`, `res_1`, `res_2`, and `res_3` can be any expressions. Note that there is no limit on the amount of branches (i.e. `elif`s), but there must be an `else`. Also, the parentheses were not necessary but were added for clarity.

The behaviour is also the same: branches are evaluated first-to-last, and upon reaching a true condition the following branches are not evaluated. When evaluating a condition, if the result can be determined after only partial evaluation, the remaining expressions are not evaluated. See **short-circuit evaluation** in [Conditional branching](#Conditional branching).
