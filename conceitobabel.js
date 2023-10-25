//Referencia William Khem Márquez
https://babeljs.io/blog/2023/10/16/cve-2023-45133
//Revisão da vulnerabilidade CVE-2023-45133 no Babel 7.x e versões posteriores, com o objetivo de evitar que se possam explorar atributos maliciosos nos arquivos JavaScript compilados pelo Babel.

const fs = require('fs');
const path = require('path');
const babel = require("@babel/core");
const traverse = require("babel-traverse").default;
const { parse } = require("acorn");
function isMaliciousAttribute(node) {
    if (typeof node !== "object" || !node) return false;
    const keys = Object.keys(node);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!key.startsWith("__") && /^[^_]/.test(key)) {
            console.log(`Posible atributo malicioso ${JSON.stringify(key)}`);
        }
    }
}

const parser = require("@babel/parser")

