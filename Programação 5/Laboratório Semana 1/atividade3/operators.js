// Operador de coalescência nula (??)
const nullValue = null;
const definedValue = "Texto";
const result1 = nullValue ?? "Valor padrão"; // Retorna 'Valor padrão'
const result2 = definedValue ?? "Valor padrão"; // Retorna 'Texto'

// Operador condicional ternário (?)
const age = 18;
const canDrive = age >= 18 ? "Sim, pode dirigir" : "Não, menor de idade";

// Operador lógico AND (&&)
const name = "João";
const greeting = name && `Olá, ${name}`; // Retorna 'Olá, João'

// Operador lógico OR (||)
const emptyValue = "";
const alternativeValue = emptyValue || "Valor alternativo"; // Retorna 'Valor alternativo'

// Exibindo resultados no console
console.log("Coalescência nula:", result1, result2);
console.log("Operador condicional ternário:", canDrive);
console.log("Operador lógico AND:", greeting);
console.log("Operador lógico OR:", alternativeValue);
