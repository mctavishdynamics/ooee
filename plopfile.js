export default function (plop) {
  plop.setGenerator("component", {
    description: "",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component Name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "components/{{name}}/{{name}}.tsx",
        templateFile: "./plop/component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "components/{{name}}/{{name}}Theme.ts",
        templateFile: "./plop/component/ComponentTheme.ts.hbs",
      },
      {
        type: "add",
        path: "components/{{name}}/{{name}}.module.css",
        templateFile: "./plop/component/Component.module.css.hbs",
      },
      {
        type: "add",
        path: "components/{{name}}/{{name}}.stories.tsx",
        templateFile: "./plop/component/Component.stories.tsx.hbs",
      },
    ],
  });
}
