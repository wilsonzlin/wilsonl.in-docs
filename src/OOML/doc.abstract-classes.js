{
    name: 'Abstract classes',
    description: 'Abstract classes',
    content:
        [
            'Abstract classes are identical to normal classes, except instances cannot be constructed from them.',
            'They are typically used for creating a base class for subclasses to extend from, implementing the common traits between them to reduce repetition and giving them a shared identity.',
            'They are implemented by using `ooml-abstract-class` instead of `ooml-class`:',
            '```\n<template ooml-abstract-class="BaseClass"></template>\n```',
            'Additionally, abstract classes may contain no DOM, meaning they may contain up to one root element (whereas normal classes must have one root element).',
            'For more on extending classes, see [inheritance](#Inheritance).'
        ].join('\n\n'),
}
