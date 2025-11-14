# 📚 Laboratório Semana 3 - Linguagens de Programação

## 📋 Índice
- [Descrição do Projeto](#descrição-do-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Programas Implementados](#programas-implementados)
  - [1. Análise de Frequência de Palavras](#1-análise-de-frequência-de-palavras)
  - [2. Sistema de Gerenciamento de Estudantes - OOP](#2-sistema-de-gerenciamento-de-estudantes---oop)
  - [3. Sistema de Gerenciamento de Estudantes - Funcional](#3-sistema-de-gerenciamento-de-estudantes---funcional)
- [Como Executar](#como-executar)
- [Conceitos Aprendidos](#conceitos-aprendidos)

---

## 🎯 Descrição do Projeto

Este projeto implementa diferentes paradigmas de programação (OOP e Funcional) em **Python** e **JavaScript**, demonstrando:

1. **Análise de Texto**: Processamento de arquivos, contagem de frequências e geração de relatórios
2. **Gerenciamento de Estudantes (OOP)**: Classes, encapsulamento e métodos
3. **Gerenciamento de Estudantes (Funcional)**: Map, filter, reduce e imutabilidade

---

## 📁 Estrutura do Projeto

```
Laboratório Semana 3/
│
├── texto.txt                    # Arquivo de entrada para análise
├── processador_texto.py         # Análise de texto em Python
├── processador_texto.js         # Análise de texto em JavaScript
├── estudante_oop.py             # Sistema OOP em Python
├── estudante_oop.js             # Sistema OOP em JavaScript
├── estudante_funcional.py       # Sistema Funcional em Python
├── estudante_funcional.js       # Sistema Funcional em JavaScript
└── README.md                    # Esta documentação
```

---

## 💻 Programas Implementados

### 1. Análise de Frequência de Palavras

#### 📝 Objetivo
Ler um arquivo de texto, processar o conteúdo, contar frequências de palavras e identificar as 5 mais frequentes.

#### 🔧 Funcionalidades
- ✅ Leitura de arquivo com tratamento de erros
- ✅ Normalização de texto (conversão para minúsculas)
- ✅ Remoção de pontuação usando regex
- ✅ Contagem de frequências
- ✅ Ordenação e seleção do Top 5
- ✅ Geração de relatório em arquivo e console

#### 🐍 Python - `processador_texto.py`

**Estruturas e Instruções Chave:**

##### 1. **Classe ProcessadorTexto**
```python
class ProcessadorTexto:
    def __init__(self, arquivo_entrada):
        self.arquivo_entrada = arquivo_entrada
        self.texto = ""
        self.palavras = []
        self.frequencias = {}
```
- **Encapsulamento**: Agrupa dados e métodos relacionados
- **`__init__`**: Construtor que inicializa o objeto
- **`self`**: Referência ao próprio objeto (similar ao `this`)

##### 2. **Leitura de Arquivo**
```python
with open(self.arquivo_entrada, 'r', encoding='utf-8') as arquivo:
    self.texto = arquivo.read()
```
- **`with`**: Gerenciador de contexto (fecha arquivo automaticamente)
- **`encoding='utf-8'`**: Suporte a acentos e caracteres especiais
- **Tratamento de exceções**: `try-except` para erros

##### 3. **Processamento com Regex**
```python
self.palavras = re.findall(r'\b\w+\b', texto_minusculo)
```
- **`re.findall()`**: Extrai padrões usando expressões regulares
- **`r'\b\w+\b'`**: 
  - `\b`: Limite de palavra
  - `\w+`: Um ou mais caracteres alfanuméricos

##### 4. **Contagem com Counter**
```python
from collections import Counter
contador = Counter(self.palavras)
```
- **`Counter`**: Classe especializada para contagem
- Mais eficiente que loop manual

##### 5. **Ordenação**
```python
palavras_ordenadas = sorted(
    self.frequencias.items(),
    key=lambda x: x[1],
    reverse=True
)
```
- **`sorted()`**: Ordena coleções
- **`key=lambda x: x[1]`**: Ordena pelo segundo elemento (frequência)
- **`reverse=True`**: Ordem decrescente

#### 🟨 JavaScript - `processador_texto.js`

**Estruturas e Instruções Chave:**

##### 1. **Classe ProcessadorTexto**
```javascript
class ProcessadorTexto {
    constructor(arquivoEntrada) {
        this.arquivoEntrada = arquivoEntrada;
        this.texto = '';
        this.palavras = [];
        this.frequencias = new Map();
    }
}
```
- **`constructor`**: Método especial de inicialização
- **`this`**: Referência ao objeto instanciado
- **`Map`**: Estrutura chave-valor otimizada

##### 2. **Leitura de Arquivo (Node.js)**
```javascript
const fs = require('fs');
this.texto = fs.readFileSync(this.arquivoEntrada, 'utf-8');
```
- **`fs`**: Módulo File System do Node.js
- **`readFileSync()`**: Leitura síncrona (bloqueia execução)

##### 3. **Processamento com Regex**
```javascript
this.palavras = textoMinusculo.match(/\b\w+\b/g) || [];
```
- **`match()`**: Extrai correspondências de regex
- **`/padrão/g`**: Flag `g` para busca global
- **`|| []`**: Operador OR para retornar array vazio se null

##### 4. **Contagem com Map**
```javascript
this.palavras.forEach(palavra => {
    const frequenciaAtual = this.frequencias.get(palavra) || 0;
    this.frequencias.set(palavra, frequenciaAtual + 1);
});
```
- **`forEach()`**: Itera sobre array
- **Arrow function**: `palavra => { ... }` sintaxe concisa
- **`Map.get()` / `Map.set()`**: Operações em Map

##### 5. **Conversão e Ordenação**
```javascript
const palavrasOrdenadas = Array.from(this.frequencias)
    .map(([palavra, freq]) => ({ palavra, frequencia: freq }))
    .sort((a, b) => b.frequencia - a.frequencia);
```
- **`Array.from()`**: Converte Map em array
- **Destructuring**: `[palavra, freq]` extrai elementos
- **`sort()`**: Ordena com função comparadora
- **Method chaining**: Encadeia operações

---

### 2. Sistema de Gerenciamento de Estudantes - OOP

#### 📝 Objetivo
Implementar sistema orientado a objetos para gerenciar estudantes, calcular médias e verificar aprovação.

#### 🔧 Funcionalidades
- ✅ Classe Estudante com propriedades (nome, notas)
- ✅ Método para calcular média
- ✅ Método para verificar aprovação (média ≥ 60)
- ✅ Classe GerenciadorEstudantes para operações em coleção
- ✅ Relatórios formatados

#### 🐍 Python - `estudante_oop.py`

**Conceitos OOP Utilizados:**

##### 1. **Definição de Classe**
```python
class Estudante:
    NOTA_MINIMA_APROVACAO = 60.0  # Constante de classe
    
    def __init__(self, nome, notas):
        self.nome = nome
        self.notas = notas
```
- **Atributo de classe**: Compartilhado por todas as instâncias
- **Atributos de instância**: Específicos de cada objeto

##### 2. **Métodos de Instância**
```python
def calcular_media(self):
    if not self.notas:
        return 0.0
    media = sum(self.notas) / len(self.notas)
    return round(media, 2)
```
- **`self`**: Primeiro parâmetro, referencia o objeto
- **`sum()` e `len()`**: Built-in functions
- **`round()`**: Arredondamento

##### 3. **Métodos que Chamam Outros Métodos**
```python
def esta_aprovado(self):
    media = self.calcular_media()
    return media >= self.NOTA_MINIMA_APROVACAO
```
- **Reutilização de código**: Chama `calcular_media()`
- **Acesso a constante**: `self.NOTA_MINIMA_APROVACAO`

##### 4. **Métodos Especiais (Dunder Methods)**
```python
def __str__(self):
    return f"{self.nome} - Média: {self.calcular_media():.2f} - {self.obter_status()}"

def __repr__(self):
    return f"Estudante(nome='{self.nome}', notas={self.notas})"
```
- **`__str__`**: Representação legível (para usuários)
- **`__repr__`**: Representação técnica (para debug)

##### 5. **Classe Gerenciadora**
```python
class GerenciadorEstudantes:
    def __init__(self):
        self.estudantes = []
    
    def obter_aprovados(self):
        return [est for est in self.estudantes if est.esta_aprovado()]
```
- **Container Pattern**: Gerencia coleção de objetos
- **List comprehension**: `[expr for item in lista if condição]`

##### 6. **Instanciação**
```python
estudante1 = Estudante("Ana Silva", [85, 92, 78, 88, 90])
gerenciador.adicionar_estudante(estudante1)
```
- **`Classe()`**: Cria nova instância
- Chama automaticamente `__init__`

#### 🟨 JavaScript - `estudante_oop.js`

**Conceitos OOP Utilizados:**

##### 1. **Definição de Classe ES6**
```javascript
class Estudante {
    static NOTA_MINIMA_APROVACAO = 60.0;
    
    constructor(nome, notas) {
        this.nome = nome;
        this.notas = Array.isArray(notas) ? notas : [];
    }
}
```
- **`static`**: Propriedade de classe
- **`constructor`**: Método de inicialização
- **Operador ternário**: `condição ? true : false`

##### 2. **Métodos de Instância**
```javascript
calcularMedia() {
    if (this.notas.length === 0) {
        return 0.0;
    }
    const soma = this.notas.reduce((acc, nota) => acc + nota, 0);
    return parseFloat((soma / this.notas.length).toFixed(2));
}
```
- **`reduce()`**: Agrega array em valor único
- **`toFixed(2)`**: Formata com 2 casas decimais
- **`parseFloat()`**: Converte string para número

##### 3. **Validação de Tipo**
```javascript
adicionarEstudante(estudante) {
    if (estudante instanceof Estudante) {
        this.estudantes.push(estudante);
    }
}
```
- **`instanceof`**: Verifica tipo do objeto
- **Type safety**: Garante consistência

##### 4. **Method Chaining**
```javascript
calcularMediaTurma() {
    const somaMedias = this.estudantes
        .map(est => est.calcularMedia())
        .reduce((acc, media) => acc + media, 0);
    return parseFloat((somaMedias / this.estudantes.length).toFixed(2));
}
```
- **Encadeamento**: Múltiplas operações em sequência
- **`map()`**: Transforma cada elemento
- **`reduce()`**: Agrega valores

##### 5. **Instanciação**
```javascript
const estudante1 = new Estudante('Ana Silva', [85, 92, 78, 88, 90]);
gerenciador.adicionarEstudante(estudante1);
```
- **`new`**: Palavra-chave para criar instância
- Chama automaticamente `constructor`

---

### 3. Sistema de Gerenciamento de Estudantes - Funcional

#### 📝 Objetivo
Implementar sistema funcional usando map, filter, reduce para processar lista de estudantes.

#### 🔧 Funcionalidades
- ✅ Funções puras (sem efeitos colaterais)
- ✅ Imutabilidade (dados não são modificados)
- ✅ Map para transformar dados
- ✅ Filter para filtrar dados
- ✅ Reduce para agregar valores
- ✅ Composição de funções

#### 🐍 Python - `estudante_funcional.py`

**Conceitos Funcionais:**

##### 1. **Dados Imutáveis**
```python
ESTUDANTES = [
    {"nome": "Ana Silva", "notas": [85, 92, 78, 88, 90]},
    {"nome": "Carlos Santos", "notas": [55, 62, 48, 58, 52]},
    # ...
]
```
- **Lista de dicionários**: Estrutura de dados simples
- **Convenção**: MAIÚSCULAS para constantes
- Dados nunca modificados diretamente

##### 2. **Funções Puras**
```python
def calcular_media(notas):
    if not notas:
        return 0.0
    return round(sum(notas) / len(notas), 2)
```
- **Sem estado externo**: Não acessa variáveis globais
- **Determinística**: Mesmo input → mesmo output
- **Sem efeitos colaterais**: Não modifica dados externos

##### 3. **Imutabilidade com Spread**
```python
def adicionar_media(estudante):
    return {
        **estudante,
        "media": calcular_media(estudante["notas"])
    }
```
- **`**dict`**: Spread operator, copia todos os campos
- **Novo dicionário**: Não modifica o original
- **Adiciona campo**: Sem mutação

##### 4. **MAP - Transformação**
```python
def processar_estudantes(estudantes):
    estudantes_com_media = list(map(adicionar_media, estudantes))
    estudantes_processados = list(map(adicionar_status, estudantes_com_media))
    return estudantes_processados
```
- **`map(função, iterável)`**: Aplica função a cada elemento
- **`list()`**: Converte iterador em lista
- **Composição**: Múltiplas transformações em sequência

##### 5. **FILTER - Filtragem**
```python
def filtrar_aprovados(estudantes):
    return list(filter(lambda est: esta_aprovado(est["media"]), estudantes))
```
- **`filter(predicado, iterável)`**: Seleciona elementos
- **`lambda`**: Função anônima inline
- **Predicado**: Função que retorna True/False

##### 6. **REDUCE - Agregação**
```python
from functools import reduce

def calcular_media_turma(estudantes):
    soma_medias = reduce(
        lambda acumulador, estudante: acumulador + estudante["media"],
        estudantes,
        0  # Valor inicial
    )
    return round(soma_medias / len(estudantes), 2)
```
- **`reduce(função, iterável, inicial)`**: Agrega em valor único
- **Acumulador**: Mantém resultado parcial
- **Padrão fold**: Comum em programação funcional

##### 7. **List Comprehension (Pythônico)**
```python
def obter_aprovados(estudantes):
    return [est for est in estudantes if esta_aprovado(est["media"])]
```
- **Sintaxe funcional**: Mais concisa que `map` + `filter`
- **`[expr for item in lista if condição]`**
- Estilo idiomático do Python

##### 8. **Pipeline Funcional**
```python
def pipeline_analise_estudantes(estudantes_raw):
    # 1. Processar (MAP)
    estudantes_processados = processar_estudantes(estudantes_raw)
    
    # 2. Filtrar (FILTER)
    aprovados = filtrar_aprovados(estudantes_processados)
    reprovados = filtrar_reprovados(estudantes_processados)
    
    return estudantes_processados, aprovados, reprovados
```
- **Pipeline**: Dados fluem por transformações
- **Composição**: Resultado de uma função → entrada de outra
- **Imutabilidade**: Cada etapa cria novos dados

#### 🟨 JavaScript - `estudante_funcional.js`

**Conceitos Funcionais:**

##### 1. **Dados Imutáveis**
```javascript
const ESTUDANTES = [
    { nome: 'Ana Silva', notas: [85, 92, 78, 88, 90] },
    { nome: 'Carlos Santos', notas: [55, 62, 48, 58, 52] },
    // ...
];
```
- **`const`**: Referência constante (não reatribui)
- **Object literal**: Sintaxe de objeto
- Convenção para constantes globais

##### 2. **Arrow Functions**
```javascript
const calcularMedia = (notas) => {
    if (!notas || notas.length === 0) return 0.0;
    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    return parseFloat((soma / notas.length).toFixed(2));
};
```
- **`=>`**: Sintaxe concisa para funções
- **Implícita**: `x => x + 1` (sem `return` explícito)
- **Léxico**: Não tem próprio `this`

##### 3. **Spread Operator**
```javascript
const adicionarMedia = (estudante) => ({
    ...estudante,
    media: calcularMedia(estudante.notas)
});
```
- **`...obj`**: Copia todas as propriedades
- **Imutabilidade**: Cria novo objeto
- **Parênteses**: `({...})` retorna objeto literal

##### 4. **MAP - Transformação**
```javascript
const processarEstudantes = (estudantes) => {
    const estudantesComMedia = estudantes.map(adicionarMedia);
    const estudantesProcessados = estudantesComMedia.map(adicionarStatus);
    return estudantesProcessados;
};
```
- **`Array.map()`**: Método nativo de array
- **Retorna novo array**: Não modifica original
- **Encadeável**: Pode chamar mais métodos

##### 5. **FILTER - Filtragem**
```javascript
const filtrarAprovados = (estudantes) => 
    estudantes.filter(est => estaAprovado(est.media));
```
- **`Array.filter()`**: Seleciona elementos
- **Arrow function inline**: Sintaxe concisa
- **Novo array**: Não modifica original

##### 6. **REDUCE - Agregação**
```javascript
const calcularMediaTurma = (estudantes) => {
    const somaMedias = estudantes.reduce(
        (acumulador, estudante) => acumulador + estudante.media,
        0  // Valor inicial
    );
    return parseFloat((somaMedias / estudantes.length).toFixed(2));
};
```
- **`Array.reduce()`**: Reduz a valor único
- **Callback**: `(acumulador, atual) => ...`
- **Flexível**: Pode retornar qualquer tipo

##### 7. **Destructuring**
```javascript
const { processados, aprovados, reprovados } = resultado;
```
- **Extração**: Pega propriedades de objeto
- **Sintaxe concisa**: Evita `resultado.processados`
- Pode ser usado em parâmetros de função

##### 8. **Method Chaining**
```javascript
const resultado = estudantes
    .map(adicionarMedia)
    .map(adicionarStatus)
    .filter(est => est.media >= 60);
```
- **Encadeamento**: Múltiplas operações em linha
- **Legibilidade**: Fluxo claro de transformações
- **Funcional**: Cada método retorna novo array

---

## 🚀 Como Executar

### Python

#### Pré-requisitos
- Python 3.7 ou superior instalado

#### Executar programas:

```powershell
# Análise de Texto
python processador_texto.py

# Sistema OOP
python estudante_oop.py

# Sistema Funcional
python estudante_funcional.py
```

### JavaScript

#### Pré-requisitos
- Node.js instalado

#### Executar programas:

```powershell
# Análise de Texto
node processador_texto.js

# Sistema OOP
node estudante_oop.js

# Sistema Funcional
node estudante_funcional.js
```

---

## 📊 Comparação: OOP vs Funcional

### Orientado a Objetos
✅ **Vantagens:**
- Código organizado em entidades lógicas
- Reutilização via herança
- Encapsulamento de estado
- Intuitivo para modelar mundo real

❌ **Desvantagens:**
- Estado mutável pode causar bugs
- Maior acoplamento
- Difícil de testar (dependências)

### Funcional
✅ **Vantagens:**
- Funções puras são fáceis de testar
- Imutabilidade evita bugs
- Composição flexível
- Paralelização mais simples

❌ **Desvantagens:**
- Curva de aprendizado mais íngreme
- Pode ser verboso
- Performance (cópias de dados)

---

## 📝 Observações Importantes

### Python
- **Indentação**: Python usa indentação (espaços/tabs) para definir blocos
- **Duck Typing**: Tipo é verificado em tempo de execução
- **PEP 8**: Convenção de estilo (snake_case, etc)
- **List Comprehension**: Recurso poderoso e idiomático

### JavaScript
- **Chaves `{}`**: Delimitam blocos de código
- **`;`**: Opcional mas recomendado
- **`const/let`**: Prefira `const` (imutável) sobre `var`
- **Async**: Natureza assíncrona importante para I/O
---

<div align=center>JALA UNIVERSITY - Linguagens de Programação</div>
<div align=center>Novembro 2025</div>
