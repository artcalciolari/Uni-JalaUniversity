document.addEventListener("DOMContentLoaded", () => {
  const input = document.createElement("input");
  const addButton = document.createElement("button");
  addButton.textContent = "Add Element";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove Last Element";
  deleteButton.disabled = true; // começa desativado

  document.body.appendChild(input);
  document.body.appendChild(addButton);
  document.body.appendChild(deleteButton);

  let lista; // referência para o elemento <ul>
  const valores = new Set(); // para checar repetição

  addButton.addEventListener("click", () => {
    const texto = input.value.trim();
    if (!texto) return;

    if (valores.has(texto)) {
      alert("Valor repetido");
      return;
    }

    if (!lista) {
      lista = document.createElement("ul");
      document.body.appendChild(lista);
    }
    const li = document.createElement("li");
    li.textContent = texto;
    lista.appendChild(li);
    valores.add(texto);
    deleteButton.disabled = false;
    input.value = "";
  });

  deleteButton.addEventListener("click", () => {
    if (lista && lista.lastElementChild) {
      const texto = lista.lastElementChild.textContent;
      lista.removeChild(lista.lastElementChild);
      valores.delete(texto);
      if (!lista.hasChildNodes()) {
        deleteButton.disabled = true;
      }
    }
  });
});
