# Laboratório Semana 3 - Atividade 2
## Paradigmas de Programação: OOP vs Funcional

Este projeto demonstra a implementação de um programa de gerenciamento de lista de números em Python usando dois paradigmas diferentes: **Orientação a Objetos (OOP)** e **Programação Funcional**.

---

## 📁 Estrutura do Projeto

```
atv2/
├── versao_oop.py          # Implementação usando OOP
├── versao_funcional.py    # Implementação usando programação funcional
├── executar_ambas.py      # Script para executar ambas as versões
├── comparacao.md          # Documentação comparativa detalhada
└── README.md              # Este arquivo
```

---

## 🎯 Funcionalidades

O programa gerencia uma lista de números inteiros e oferece:

1. **Obter números pares**: Filtra e retorna apenas os números pares da lista
2. **Calcular média**: Calcula a média aritmética de todos os números

Lista de exemplo utilizada: `[2, 5, 8, 11, 14]`

---

## 🚀 Como Executar

### Executar apenas a versão OOP:
```bash
python versao_oop.py
```

### Executar apenas a versão funcional:
```bash
python versao_funcional.py
```

### Executar ambas as versões (recomendado):
```bash
python executar_ambas.py
```

---

## 📊 Resultados Esperados

Ambas as versões devem produzir os mesmos resultados:

- **Lista original**: [2, 5, 8, 11, 14]
- **Números pares**: [2, 8, 14]
- **Média da lista**: 8.00

---

## 📚 Documentação

Para uma análise detalhada das diferenças entre as abordagens, vantagens e desvantagens de cada paradigma, consulte o arquivo [`comparacao.md`](comparacao.md).

---

## 🔍 Conceitos Demonstrados

### Versão OOP:
- Classes e objetos
- Encapsulamento de dados
- Métodos de instância
- Estado interno

### Versão Funcional:
- Funções puras
- `filter()` com expressões lambda
- `reduce()` para agregação
- Imutabilidade
- Programação declarativa