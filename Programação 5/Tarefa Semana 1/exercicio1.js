// Função Pura - não altera o estado de nada.
function multiply(a, b) {
  return a * b;
}

// Função Impura - altera o estado de algo externo.
let count = 0;
function increment() {
  count++;
  return count;
}

// --------------------------------------------

// Currying - técnica de transformar uma função com n parâmetros em uma função com 1 parâmetro.
function sum(a) {
  return function (b) {
    return a + b;
  };
}

// --------------------------------------------

console.log("FUNÇÕES DE ORDEM SUPERIOR");
// Função de ordem superior - recebe uma função como parâmetro ou retorna uma função.
function mapArray(array, fn) {
  return array.map(fn);
}

const array = [1, 2, 3, 4, 5];
const mappedArray = mapArray(array, (item) => item * 2);
console.log(array);
console.log(mappedArray);

// NOTE que por mais que o array seja passado como referência, a função mapArray não altera o array original. Já que o Javascript
// cria uma cópia caso você não modifique o array dentro da função.

console.log();
// --------------------------------------------

console.log("CLOSURES");
// Closure - é a capacidade de uma função lembrar do seu escopo léxico, mesmo quando a função é executada fora desse escopo.
function createPrefixer(prefix) {
  return function (str) {
    return prefix + str;
  };
}

const addHello = createPrefixer("Hello, ");
const addGoodbye = createPrefixer("Goodbye, ");

console.log(addHello("Arthur"));
console.log(addHello("Maria"));
console.log(addGoodbye("Arthur"));
console.log(addGoodbye("Maria"));

console.log();
// --------------------------------------------

console.log("CALLBACKS");
// Callbacks - é uma função que é passada como parâmetro para outra função.
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Arthur", sayGoodbye);

// Após executar a função greet, a função sayGoodbye é executada, pois foi passada como callback.

console.log();
// --------------------------------------------

console.log("IMMUTABILITY");
// Immutability - técnica de programação que consiste em não alterar o valor de uma variável, mas sim criar uma nova variável com o valor desejado.
const object1 = {
  name: "Arthur",
  age: 22,
};

const newObject = { ...object1, age: 23 };

console.log(object1);
console.log(newObject);

console.log();
// NOTE que o object1 não foi alterado, mas um novo objeto com o valor desejado foi criado.

// --------------------------------------------

console.log("DEEP AND SHALLOW COPIES");
const object2 = {
  name: "Arthur",
  age: 22,
  address: {
    city: "São Paulo",
    state: "SP",
  },
};

// Deep Copy - copia todas as propriedades do objeto, inclusive objetos aninhados (que são passados como valor e não referência).
const newObject1 = JSON.parse(JSON.stringify(object2));
newObject1.address.city = "Curitiba";
newObject1.address.state = "PR";

console.log(object2); // A propriedade address do objeto original não foi alterada.

// Shallow Copy - copia apenas o primeiro nível de propriedades. Objetos aninhados são passados como referência.
const newObject2 = { ...object2 };
newObject2.address.city = "Rio de Janeiro";
newObject2.address.state = "RJ";

console.log(object2); // A propriedade address do objeto original foi alterada.
