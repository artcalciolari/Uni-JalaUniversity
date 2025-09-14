# Laboratório Semana 2: Refatoração JavaScript, TypeScript e Layout Responsivo

Este projeto demonstra a refatoração de código JavaScript legado para ES6+ e sua conversão para TypeScript, além da criação de um layout responsivo com formulários e armazenamento local. Ele é dividido em duas atividades principais: `atv1` (refatoração e TypeScript) e `atv2` (layout e formulário).

## Refatoração JavaScript e Conversão TypeScript

### Código Legado (ES5)
O arquivo [`atv1/user-manager-es5.js`](atv1/user-manager-es5.js) representa um projeto JavaScript "legado" simples para gerenciamento de usuários. Ele utiliza sintaxe ES5, incluindo:
- Declarações com `var`.
- Funções tradicionais com `function`.
- Loops manuais com `for` para iteração e busca.
- Estruturas básicas de dados sem tipagem.

Exemplo de código legado:
```javascript
var users = [
  { id: 1, name: 'Ana', email: 'ana@email.com' },
  // ...
];

function addUser(id, name, email) {
  var newUser = {
    id: id,
    name: name,
    email: email,
  };
  users.push(newUser);
}
```

### Refatoração para ES6+
O arquivo [`atv1/user-manager-es6.js`](atv1/user-manager-es6.js) refatora o código legado para utilizar recursos modernos do ES6+:
- **const/let**: Substituição de `var` por `const` e `let` para escopo de bloco.
- **Arrow functions**: Sintaxe mais concisa para funções, como `const addUser = ({ id, name, email }) => { ... };`.
- **Destructuring**: Extração de propriedades diretamente nos parâmetros, e.g., `{ id, name, email }`.
- **Spread operator**: Criação de cópias de arrays, e.g., `const usersCopy = [...users, newUser];`.
- **Métodos de array modernos**: Uso de `find` para busca e `map` para transformação, substituindo loops manuais.

Exemplo de refatoração:
```javascript
const addUser = ({ id, name, email }) => {
  const newUser = { id, name, email };
  users.push(newUser);
};

const getUserById = (id) => users.find(user => user.id === id);
```

### Conversão para TypeScript
O arquivo [`atv1/user-manager.ts`](atv1/user-manager.ts) converte o código refatorado para TypeScript, adicionando tipagem estática:
- **Interfaces**: Definição de `interface User` para estruturar os dados de usuário.
- **Tipos em variáveis e funções**: Aplicação de tipos como `User[]`, `number`, `string`, etc.
- **Função genérica**: Implementação de `findItem<T>`, que aceita qualquer tipo `T` e busca por propriedade, demonstrando generics.

Exemplo de TypeScript:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const addUser = ({ id, name, email }: User): void => {
  const newUser: User = { id, name, email };
  users.push(newUser);
};

function findItem<T>(array: T[], property: keyof T, value: unknown): T | null {
  return array.find(item => item[property] === value) || null;
}
```

## Layout Responsivo com Formulários e Armazenamento

### Layout Responsivo
O arquivo [`atv2/index.html`](atv2/index.html) cria uma página única responsiva utilizando:
- **CSS Grid**: Para a estrutura principal da página (header, main, footer).
- **Flexbox**: Para alinhamento de componentes internos, como o formulário.

### Estilização com SASS
O arquivo [`atv2/style.scss`](atv2/style.scss) utiliza SASS para estilização:
- **Variáveis**: Definição de cores, fontes e bordas, e.g., `$primary-color: #3498db;`.
- **Aninhamento**: Estrutura hierárquica de seletores para melhor organização.
- **Responsividade**: Media queries para telas menores, ajustando tamanhos e layouts.

Exemplo de SASS:
```scss
$primary-color: #3498db;

.container {
  display: grid;
  grid-template-areas: "header" "main" "footer";

  .header {
    grid-area: header;
    background-color: $secondary-color;
  }
}
```

### Formulário e Validação
O formulário em [`atv2/index.html`](atv2/index.html) inclui múltiplos tipos de entrada:
- Campos de texto (nome, email, telefone).
- Radio buttons (preferência de contato).
- Checkbox (newsletter).
- Textarea (mensagem).

A validação do lado cliente é implementada em [`atv2/script.js`](atv2/script.js):
- Uso de regex para email e telefone.
- Verificação de campos obrigatórios e formatos.
- Exibição de mensagens de erro dinâmicas.

### Armazenamento no localStorage
Após validação bem-sucedida:
- Os dados do formulário são salvos no `localStorage` como string JSON.
- Uma mensagem de confirmação é exibida.

Exemplo em [`atv2/script.js`](atv2/script.js):
```javascript
const formData = new FormData(form);
const data = Object.fromEntries(formData);
localStorage.setItem('formData', JSON.stringify(data));
confirmationMessage.classList.remove('hidden');
```

## Como Executar
1. **Para atv1**: Abra os arquivos `.js` e `.ts` em um navegador ou Node.js. Para TypeScript, compile com `tsc` usando [`atv1/tsconfig.json`](atv1/tsconfig.json).
2. **Para atv2**: Abra [`atv2/index.html`](atv2/index.html) em um navegador. O CSS é compilado de SASS para [`atv2/style.css`](atv2/style.css).

## Tecnologias Utilizadas
- **JavaScript/ES6+**: Refatoração e validação.
- **TypeScript**: Tipagem estática e interfaces.
- **HTML5**: Estrutura da página.
- **SASS**: Pré-processador CSS com variáveis e aninhamento.
- **CSS Grid/Flexbox**: Layout responsivo.
- **localStorage**: Armazenamento local de dados.