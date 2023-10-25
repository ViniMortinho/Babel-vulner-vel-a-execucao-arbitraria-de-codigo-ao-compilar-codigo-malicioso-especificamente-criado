# Babel-vulner-vel-a-execucao-arbitraria-de-codigo-ao-compilar-codigo-malicioso-especificamente-criado
 Documentação do código de vulnerabilidade do Babel

# Vulnerabilidade CVE-2023-45133 no Babel

A vulnerabilidade CVE-2023-45133 é uma vulnerabilidade de execução arbitrária (RCE) no Babel, um compilador JavaScript. A vulnerabilidade permite que um invasor execute código arbitrário no contexto do alvo, simplesmente passando código JavaScript malicioso para o Babel para compilação.

## Como funciona

A vulnerabilidade ocorre no método `evaluate()` do Babel. Este método é responsável por avaliar expressões JavaScript de forma estática. A vulnerabilidade ocorre porque o método `evaluate()` permite a avaliação de expressões de chamada, mesmo que o método chamado seja herdado.

Para explorar a vulnerabilidade, um invasor pode passar código JavaScript malicioso para o Babel para compilação. O código JavaScript malicioso deve conter uma expressão de chamada para um método herdado que possa ser usado para executar código arbitrário.

## Como se proteger

Para se proteger da vulnerabilidade CVE-2023-45133, os usuários do Babel devem seguir estas dicas:

- Mantenha o Babel atualizado para a versão mais recente. A vulnerabilidade foi corrigida no Babel 7.23.2 e 8.0.0-alpha.4.
- Use um compilador JavaScript seguro, como o TypeScript. O TypeScript não é afetado por essa vulnerabilidade.
- Evite compilar código JavaScript de fontes desconhecidas. Se você não sabe a origem do código JavaScript, não o compile.

## Exemplos

O seguinte código JavaScript malicioso pode ser usado para explorar a vulnerabilidade:

```javascript
function foo() {
  console.log("Hello, world!");
}

const eval = require("@babel/parser").default;
const source = `Number.constructor(foo)`;
const ast = eval.parse(source);

const evalVisitor = {
  Expression(path) {
    path.evaluate();
  },
};

eval(ast, evalVisitor);
Este código JavaScript malicioso passa o seguinte código para o Babel para compilação: `Number.constructor(foo);`. O método `Number.constructor()` retorna um construtor de número. O construtor de número tem um método herdado chamado `toString()`. O método `toString()` pode ser usado para converter um número em uma string.

O código JavaScript malicioso atribui o método `foo()` ao método `toString()` do construtor de número. Isso significa que, quando o construtor de número é usado para converter um número em uma string, o código `foo()` é executado.

No exemplo acima, o código `foo()` simplesmente imprime "Hello, world!" no console. No entanto, um invasor pode usar o código malicioso para executar qualquer código arbitrário.

## Correções

A vulnerabilidade CVE-2023-45133 foi corrigida no Babel 7.23.2 e 8.0.0-alpha.4. Os usuários do Babel devem atualizar para uma versão corrigida para evitar a exploração dessa vulnerabilidade.
