import fs from "node:fs";
import { parse } from "acorn";
import { walk } from "zimmerframe";

export function check(filePath) {
    const errors = [];

    const content = fs.readFileSync(filePath, "utf-8");
    const AST = parse(content, { ecmaVersion: "2025", sourceType: "module" });

    const transformed = walk(AST, { asyncFuncs: [], errors }, {
        FunctionDeclaration(node, { state }) {
            if (node.async) {
                state.asyncFuncs.push(node.id.name);
            }
        },
        IfStatement(node, { state }) {
            if (node.test.type === 'CallExpression' && state.asyncFuncs.includes(node.test.callee.name)) {
                const { start, end } = node.test;
                state.errors.push({ start, end });
            }
        }
    });

    return errors;
}
