import fs from "node:fs";
import {parse} from "acorn";
import {walk} from "zimmerframe";

export function check(filePath) {
    const errors = [];
    const contentFile = fs.readFileSync(filePath, 'utf8');
    const astTree = parse(contentFile, {ecmaVersion: 'latest', sourceType: 'module'});

    // Собираем async-функции по имени
    const asyncFunctions = new Set();

    walk(astTree, {}, {
        FunctionDeclaration(node) {
            if (node.async && node.id) {
                asyncFunctions.add(node.id.name);
            }
        }
    });

    walk(astTree, {}, {
        CallExpression(node, {path}) {
            const haveIfStatementParent = path.find((parentNode) => parentNode.type === 'IfStatement');
            const haveAwaitExpressionParent = path.find((parentNode) => parentNode.type === 'AwaitExpression');
            if (!haveIfStatementParent || haveAwaitExpressionParent) {
                return;
            }

            const callee = node.callee;
            let fnName = null;

            if (callee.type === 'Identifier') {
                fnName = callee.name;
            } else if (
                callee.type === 'MemberExpression' &&
                !callee.computed &&
                callee.property.type === 'Identifier'
            ) {
                fnName = callee.property.name;
            }

            if (fnName && asyncFunctions.has(fnName)) {
                errors.push({start: node.start, end: node.end});
            }
        }
    });


    return errors;
}
