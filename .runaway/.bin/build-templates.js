const path = require("path");
const fs = require("fs");
const glob = require("glob");

const REPLACEMENTS = {
  NAME____: "{{name}}",
};

glob.sync("./plop/**/*.{ts,tsx,css}").forEach((filePath) => {
  let content = fs.readFileSync(filePath).toString();

  Object.keys(REPLACEMENTS).forEach((original) => {
    content = content.replaceAll(original, REPLACEMENTS[original]);
  });

  const newFilePath = filePath.split(".").slice(0, -1).join(".");
  console.log(newFilePath);
  fs.writeFileSync(newFilePath, content);
});
