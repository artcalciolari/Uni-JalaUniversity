// Exibir alerta ao clicar no botão
document.getElementById("alertButton").addEventListener("click", function () {
  alert("Button Clicked!");
});

// Função para somar dois números
function sumNumbers(a, b) {
  return a + b;
}

// Evento onclick para somar dois números
document.getElementById("sumButton").addEventListener("click", function () {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const sumResult = sumNumbers(num1, num2);
  document.getElementById("result").innerText = `Resultado: ${sumResult}`;
});

// JavaScript funcional usando map, filter e reduce
const array = [1, 2, 3, 4, 5];

// 1. Duplica os valores com map
const doubledArray = array.map((x) => x * 2);

// 2. Filtra valores maiores que 5
const filteredGreaterThanFive = doubledArray.filter((x) => x > 5);

// 3. Soma os valores filtrados com reduce
const totalGreaterThanFive = filteredGreaterThanFive.reduce((acc, val) => acc + val, 0);

console.log("Array original:", array);
console.log("Array duplicado:", doubledArray);
console.log("Array filtrado:", filteredGreaterThanFive);
console.log("Soma dos valores filtrados:", totalGreaterThanFive);

// Função assíncrona com async/await e setTimeout
async function simulateApiCall() {
  console.log("Iniciando chamada à API...");
  const simulatedApiResponse = await new Promise((resolve) =>
    setTimeout(() => resolve("Resposta da API simulada"), 2000)
  );
  console.log("Chamada concluída:", simulatedApiResponse);
}

// Chamando a função assíncrona
simulateApiCall();
