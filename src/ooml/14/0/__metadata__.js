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
        "Compatibility and versioning",
        "Environment, setup, and usage",
      ],
    },
    {
      name: "Namespaces",
      entries: [
        "Declaring namespaces",
        "Initialising namespaces",
        "Imports",
        "Initial instantiations",
      ],
    },
    {
      name: "Classes",
      entries: [
        "Declaring classes",
        "Inheritance",
        "Abstract classes",
        "View extension",
        "Serialisation and deserialisation",
        "Constructors",
        "Dispatch events",
      ],
    },
    {
      name: "Properties",
      entries: [
        "Declaring properties",
        "Default property values",
        "Typing",
        "Transient properties",
        "Array properties",
        "Attribute properties",
        "Getters, setters, and change listeners",
        "Binding",
      ],
    },
    {
      name: "Methods",
      entries: [
        "Declaring methods",
        "Using methods",
        "Static methods",
        "Factory methods",
        "Serialisation methods",
      ],
    },
    {
      name: "Views",
      entries: [
        "Declaring views",
        "Substitution",
        "DOM event handlers",
        "DOM exposing",
        "Table tags",
        "HTML attributes",
      ],
    },
    {
      name: "Instances",
      entries: [
        "Instantiating",
        "Initial state",
        "Instance attachment",
      ]
    },
    {
      name: "Arrays",
      entries: [
        "Using OOML.Array",
        "Array attachment",
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
        "External event handlers",
        "Errors",
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
