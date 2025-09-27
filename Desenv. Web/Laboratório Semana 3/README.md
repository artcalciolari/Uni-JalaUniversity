# 🌤️ Painel Meteorológico

Uma aplicação React moderna para consulta de informações meteorológicas em tempo real, com tema claro/escuro e interface responsiva.

## ✨ Características

- **Busca de Clima**: Pesquise o clima de qualquer cidade
- **Interface Moderna**: Design clean e responsivo
- **Tema Claro/Escuro**: Alternador de tema dinâmico
- **Estado em Tempo Real**: Dados atualizados da API OpenWeatherMap
- **Componentes Reutilizáveis**: Arquitetura modular com React

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca de interface do usuário
- **Vite**: Ferramenta de build rápida
- **CSS3**: Estilização com variáveis CSS e animações
- **Open-Meteo API**: Dados meteorológicos gratuitos

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🚀 Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar a Aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

**✨ Não é necessário configurar chave de API!** A Open-Meteo é uma API totalmente gratuita.

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── SearchBar.jsx       # Barra de busca controlada
│   ├── WeatherDisplay.jsx  # Exibição dos dados meteorológicos
│   └── ThemeSwitcher.jsx   # Alternador de tema
├── config/
│   └── api.js             # Configuração da API
├── App.jsx                # Componente principal
├── App.css               # Estilos da aplicação
├── index.css             # Estilos globais
└── main.jsx              # Ponto de entrada
```

## 🎯 Funcionalidades Implementadas

### Gerenciamento de Estado
- `useState` para gerenciar dados meteorológicos, estado de carregamento e tema
- Estado controlado na barra de busca

### Efeitos Colaterais
- `useEffect` para buscar dados da API quando a consulta muda
- Tratamento de erros e estados de carregamento

### Comunicação entre Componentes
- Props passadas do componente App para componentes filhos
- Callbacks para comunicação reversa (child-to-parent)

### UI Dinâmica
- Alternador de tema que aplica classes CSS dinamicamente
- Animações e transições suaves
- Design responsivo

## 🎨 Temas

A aplicação suporta dois temas:

- **Tema Claro**: Interface clara com tons azuis
- **Tema Escuro**: Interface escura com gradientes

O tema é controlado por estado local e aplica classes CSS dinamicamente.

## 📱 Responsividade

- Layout flexível que se adapta a diferentes tamanhos de tela
- Grid responsivo para detalhes meteorológicos
- Navegação otimizada para dispositivos móveis

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linting do código

## 🐛 Solução de Problemas

### Cidade não encontrada
Se receber erro de cidade não encontrada:
1. Verifique a grafia da cidade
2. Tente usar o nome em português ou inglês
3. Inclua acentos quando necessário (ex: "São Paulo")

### 🚫 Erro de conexão
Se houver problemas de conectividade:
1. Verifique sua conexão com a internet
2. A API Open-Meteo pode estar temporariamente indisponível


---

<div align="center">

Este projeto foi criado para fins educacionais como parte do laboratório da Semana 3.

</div>