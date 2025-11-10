# Sistema de Gerenciamento de Funcionários

Projeto desenvolvido em TypeScript utilizando conceitos de Programação Orientada a Objetos (POO).

## 📋 Descrição

Este projeto implementa um sistema para manipulação de três classes principais:

- **Funcionario**: Classe base com atributos nome, idade e cpf
- **Professor**: Herda de Funcionario e adiciona o atributo titulacao
- **Administrativo**: Herda de Funcionario e adiciona o atributo setor

## 🎯 Conceitos de POO Aplicados

- **Herança**: Classes `Professor` e `Administrativo` herdam de `Funcionario`
- **Encapsulamento**: Uso de modificadores de acesso (private, protected, public)
- **Polimorfismo**: Sobrescrita do método `exibirInformacoes()` nas classes derivadas
- **Abstração**: Organização de dados e comportamentos em classes específicas

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

### Executar o Projeto

**Modo desenvolvimento (com ts-node):**
```bash
npm run dev
```

**Compilar e executar:**
```bash
npm run build
npm start
```

**Modo watch (recompila automaticamente):**
```bash
npm run watch
```

## 📁 Estrutura do Projeto

```
src/
├── models/
│   ├── Funcionario.ts      # Classe base
│   ├── Professor.ts         # Classe derivada
│   └── Administrativo.ts    # Classe derivada
└── index.ts                 # Arquivo principal com exemplos
```

## 💡 Exemplos de Uso

O arquivo `src/index.ts` contém exemplos de criação e manipulação das classes:

- Criação de funcionários, professores e administrativos
- Exibição de informações
- Atualização de atributos usando setters
- Demonstração de herança e polimorfismo

## 📝 Tarefa Semana 2
<div align=center>
Arthur Calciolari
</div>
