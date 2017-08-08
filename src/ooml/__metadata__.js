module.exports = {
    landingArticle: {
        category: "Introduction",
        entry: "Welcome",
    },
    categories: [
        {
            name: "Introduction",
            entries: [
                "Welcome",
                "About ooml",
                "Compatibility and support", // 1) Browser support. 2) Reporting bugs and ideas. 3) Webpack, browserify, require, babel (no need). 4) Building from source.
                "Core principles",
                "How it works",
                "Environment, setup and usage",
            ],
        },
        {
            name: "Fundamentals",
            entries: [
                "Terminology",
                "Namespaces",
                "Classes",
                "Properties",
                "Methods",
                "Views",
                "Instances",
            ],
        },
        {
            name: "Classes",
            entries: [
                "Inheritance",
                "Abstract classes",
                "View extension",
                "Serialisation and unserialisation",
                "Constructors",
            ],
        },
        {
            name: "Properties",
            entries: [
                "Transient properties",
                "Typing",
                "Getters, setters, and change listeners",
                "Binding",
                "Default property values",
                "Initial state",
            ],
        },
        {
            name: "Methods",
            entries: [
                "Static methods",
                "Factory methods",
                "Serialisation methods",
            ],
        },
        {
            name: "View",
            entries: [
                "Substitution",
                "DOM event handlers",
                "Table tags",
                "HTML attributes",
                "DOM exposing",
            ],
        },
        {
            name: "Events",
            entries: [
                "Mutation events",
                "Dispatch events",
            ],
        },
        {
            name: "Hive",
            entries: [
                "Global store",
                "Message brokering",
            ],
        },
        {
            name: "Additional information",
            entries: [
                "Older versions",
                "Exceptions",
                "Identifiers", // Recommendations and restrictions on names for attributes, properties, methods, and classes
                "Abstractions", // Topics: 1) Don't be stupid. 2) Don't try to circumvent OOML. 3) Things that might trip you up (e.g. setTimeout on attrs). 4) There's probably a way to do it -- it's your fault.
                "Pitfalls", // 1) Single-line comments in ooml methods will break the method if the HTML is minified. 2) Escape HTML special chars in default values, inline code and method functions.
            ]
        },
        {
            name: "Reference",
            entries: [
                "OOML.Namespace",
                "OOML.Instance",
                "OOML.Array",
                "HTML syntax", // Every single special HTML tag, attribute or textContent
            ],
        },
    ]
};
