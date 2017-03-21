OOML is designed to have a "inverse learning curve" — that is, it's designed to allow beginners to start developing serious apps very quickly, only requiring them to learn the rest when necessary.

This is possible because the fundamental concepts and techniques of OOML are based on popular and well-known concepts like object orientation and HTML templating.

OOML is also designed to be incredibly easy to set up and develop in. Unlike some other frameworks, there is only one file weighing in at around 30 KB, which can be included in a `<script>` tag. It takes just one line to initialise OOML.

Also, interacting with OOML is designed to be almost identical to interacting with JavaScript. This makes the code intuitive and easy to understand, and look like regular JavaScript logic.

Here is a simple to-do list app:

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="ooml.js"></script>
    </head>
    <body>
        <template ooml-class="ListEntry">
            <li>{{ this.name }}</li>
        </template>
        
        <template ooml-class="List">
            <ul>
                <ooml-substitution property="items" class="ListEntry" array></ooml-substitution>
            </ul>
            
            <form domonsubmit="
                event.preventDefault();
                this.items.push({ name: this.$input.value });
            ">
                <input ooml-expose="input">
                <button type="submit">Add</button>
            </form>
        </template>
        
        <ul ooml-instantiate="List list"></ul>
        
        <script>
            let ooml = new OOML.Namespace();
        </script>
    </body>
</html>
```

Finally, OOML is designed to mirror the server's state. Initialising an app with previous state is incredibly easy, and so is serialising the state to send to the server. This makes it possible to model the UI around the data, allowing the user to interact and manipulate it, and sync with the server seamlessly.
