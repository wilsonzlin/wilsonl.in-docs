{
    name: 'Classes',
    description: 'Classes',
    content:
        [
            'Classes are very similar to classes in most other object-orientated languages:',
            [
                '- There are properties and methods',
                '- Classes can be extended, inheriting properties and methods from ancestor classes',
                '- Advanced features like abstract classes, constructors, serialisation and deserialisation, and factory methods are available',
                '- They are all also JavaScript classes, making it very easy to use them in any JavaScript logic',
            ].join('\n'),
            'Classes are declared using HTML templates in the HTML file:',
            '```\n<template ooml-class="MyClass"></template>```',
            'Template elements ensure faster processing as browsers that support it will not try to parse the contents.',
            'Inside the template element, there are a few tags that describe the [attributes](#Attributes), [properties](#Properties) and [methods](#Methods) of the class, and then the root element of the DOM of the class is laid out.',
        ].join('\n\n'),
}
