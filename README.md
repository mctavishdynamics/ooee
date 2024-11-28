# Plop Codegen

To make templates nicer to edit and format with syntax highlighting and all that, we're using `npm run build-templates` 
which replaces certain strings in any of the files in `plop/` with Handlebars-friendly versions.  For example, 
`NAME____` gets replaced with `{{name}}`

- `npx plop component`