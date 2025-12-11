# Tarefa Semana 6 - WebAssembly com C++ e Python

Este projeto demonstra o uso de WebAssembly (Wasm) integrando código C++ e Python diretamente no navegador.

## Estrutura do Projeto

- `cpp/`: Contém a implementação em C++ compilada para Wasm.
- `python/`: Contém a implementação em Python utilizando PyScript.

## 1. C++ com Emscripten

### Implementação
O arquivo `cpp/math_core.cpp` define uma função simples de calculadora (`calculate`) que realiza operações básicas (soma, subtração, multiplicação, divisão).

A macro `EMSCRIPTEN_KEEPALIVE` é usada para garantir que a função não seja removida durante a otimização e possa ser chamada pelo JavaScript.

### Compilação
O código C++ foi compilado para WebAssembly utilizando o compilador **Emscripten** (`emcc`). O comando gera os arquivos necessários para a execução no navegador:
- `math.wasm`: O binário WebAssembly (código compilado).
- `math.js`: O código "cola" (glue code) necessário para carregar e interagir com o módulo Wasm.

### Integração
No arquivo `cpp/index.html`, a função C++ é chamada via JavaScript utilizando `Module.ccall`. Isso permite passar argumentos do JS para o C++ e receber o resultado de volta instantaneamente.

## 2. Python com PyScript

### Implementação
O arquivo `python/index_python.html` utiliza a biblioteca **PyScript**. O PyScript permite rodar código Python no navegador, executando sobre uma implementação do CPython compilada para WebAssembly (geralmente Pyodide).

### Funcionalidade
O script Python embutido no HTML (`<script type="py">`):
1. Importa módulos para interagir com o DOM (`pyscript.document`, `js.window`).
2. Acessa um elemento `<canvas>` HTML.
3. Utiliza a API de contexto 2D do Canvas para desenhar formas geométricas (retângulo, círculo, triângulo) e texto, demonstrando a capacidade do Python de manipular elementos visuais no browser.

## Como Executar

Devido às políticas de segurança dos navegadores (CORS), arquivos Wasm e módulos PyScript geralmente não funcionam corretamente se abertos diretamente pelo sistema de arquivos (protocolo `file://`). É necessário usar um servidor local.

### Passo 1: Iniciar o Servidor
Abra o terminal na raiz do projeto e execute um servidor HTTP simples com Python:

```bash
python3 -m http.server 8000
```

### Passo 2: Acessar os Exemplos

Abra o navegador e acesse os seguintes endereços:

*   **C++ Calculator:** [http://localhost:8000/cpp/](http://localhost:8000/cpp/)
*   **Python Canvas:** [http://localhost:8000/python/index_python.html](http://localhost:8000/python/index_python.html)

## Evidências de Execução

### C++ (Calculadora)
![alt text](<Imagem do WhatsApp de 2025-12-10 à(s) 20.51.51_1582f86a.jpg>)

![alt text](<Imagem do WhatsApp de 2025-12-10 à(s) 20.52.03_7b31e70f.jpg>)
### Python (Canvas)
![alt text](<Imagem do WhatsApp de 2025-12-10 à(s) 20.58.38_1167308f.jpg>)
