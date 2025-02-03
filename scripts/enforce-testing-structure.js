import { readFile } from "fs/promises";
const testCategories = JSON.parse(
  await readFile(new URL("./assets/web.test.categories.json", import.meta.url))
);

const testingStructure = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce testing file structure",
    },
    fixable: "code",
    schema: [],
    hasSuggestions: true,
  },
  create(context) {
    return {
      CallExpression(node) {
        var sourceCode = context.sourceCode;

        // RULE: Root level describe block's first parameter should be a string that starts with "zeta-"
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "describe" &&
          node.parent.parent.parent === null
        ) {
          const firstArg = node.arguments[0];
          if (
            firstArg &&
            firstArg.type === "Literal" &&
            typeof firstArg.value === "string"
          ) {
            if (!firstArg.value.startsWith("zeta-")) {
              context.report({
                node: firstArg,
                message:
                  'Root level describe block\'s first parameter should be a string that starts with "zeta-".',
                fix(fixer) {
                  return fixer.replaceText(
                    firstArg,
                    `"zeta-${firstArg.value}"`
                  );
                },
              });
            }
          }

          // RULE: Nested describe blocks should have unique names
        } else if (
          node.callee.type === "Identifier" &&
          node.callee.name === "describe"
        ) {
          const allNestedDescribes = sourceCode
            .getScope(node)
            .block.body.body.filter(
              (bodyNode) =>
                bodyNode.type === "ExpressionStatement" &&
                bodyNode.expression.callee.name === "describe"
            );
          const nestedDescribeNames = allNestedDescribes.map(
            (describeNode) => describeNode.expression.arguments[0].value
          );

          if (
            nestedDescribeNames.filter(
              (name) => name === node.arguments[0].value
            ).length > 1
          ) {
            context.report({
              node: node,
              message: "Nested describe blocks should have unique names.",
            });
          }

          // RULE: Describe block's first parameter should be one of the testing categories.
          const firstArg = node.arguments[0];
          if (
            firstArg &&
            firstArg.type === "Literal" &&
            typeof firstArg.value === "string"
          ) {
            if (!testCategories.includes(firstArg.value)) {
              context.report({
                node: firstArg,
                message: `Describe block\'s first parameter should be one of the following: ${testCategories.join(", ")}.`,
                fix(fixer) {
                  let type;
                  testCategories.forEach((category) => {
                    if (firstArg.value.includes(category)) {
                      type = category;
                    }
                  });
                  if (type !== undefined) {
                    return fixer.replaceText(firstArg, `"${type}"`);
                  }
                },
              });
            }
          }

          // RULE: Tests should be inside nested describe blocks.
        } else if (
          node.callee.type === "Identifier" &&
          node.callee.name === "it"
        ) {
          let hasCategoryDescribe;
          sourceCode.getAncestors(node).forEach((ancestor) => {
            if (
              ancestor.type === "CallExpression" &&
              (ancestor.callee.name === "describe" ||
                ancestor.callee.property.name === "skip")
            ) {
              if (testCategories.includes(ancestor.arguments[0].value)) {
                hasCategoryDescribe = true;
              }
            }
          });
          if (!hasCategoryDescribe) {
            context.report({
              node: node,
              message: "Tests should be inside nested describe blocks.",
            });
          }
        }
      },
    };
  },
};

const plugin = { rules: { "enforce-testing-structure": testingStructure } };
export default plugin;
