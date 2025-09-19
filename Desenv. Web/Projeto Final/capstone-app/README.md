# 📚 BookFlow

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Router](https://img.shields.io/badge/React_Router-7.9.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

> **Uma biblioteca digital moderna e intuitiva para descobrir e explorar livros**

BookFlow é uma aplicação web moderna construída com React 19 e TypeScript que oferece uma experiência elegante para buscar, descobrir e explorar livros usando a API do Open Library. Com design responsivo e componentes totalmente documentados, é o projeto perfeito para demonstrar habilidades em desenvolvimento frontend moderno.

## ✨ Características Principais

### 🔍 **Busca Inteligente**
- Busca em tempo real usando a API Open Library
- Estados de loading com skeleton UI elegante
- Resultados paginados e otimizados
- Tratamento de erro robusto

### 🎨 **Design Moderno**
- Interface limpa e intuitiva
- Design system completo com custom properties CSS
- Layout responsivo para todos os dispositivos
- Animações suaves e microinterações

### 📖 **Detalhes Completos**
- Informações detalhadas de livros e autores
- Capas em alta resolução
- Biografia de autores com fallbacks
- Metadados estruturados (tags, classificação, datas)

### 🏗️ **Arquitetura Profissional**
- Componentes React funcionais com hooks customizados
- Context API para gerenciamento de estado global
- TypeScript com tipagem rigorosa
- Documentação JSDoc completa

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 19.1.1 | Library para interfaces reativas |
| **TypeScript** | 5.0+ | Tipagem estática e developer experience |
| **Vite** | 6.0+ | Build tool moderna e rápida |
| **React Router** | 7.9.1 | Roteamento client-side |
| **React Icons** | 5.5.0 | Ícones SVG otimizados |
| **TypeDoc** | Latest | Geração de documentação automática |

## 🎨 Design System

O projeto utiliza um design system robusto baseado em CSS custom properties:

### **Paleta de Cores**
```css
/* Cores Primárias */
--primary-600: #e25d1b  /* Laranja principal */
--primary-700: #bb4418  /* Laranja escuro */
--primary-900: #782f19  /* Laranja muito escuro */

/* Cores Neutras */
--neutral-900: #171717  /* Texto primário */
--neutral-600: #525252  /* Texto secundário */
--neutral-200: #e5e5e5  /* Bordas */

/* Cores de Destaque */
--accent-blue: #3b82f6   /* Links e ações */
--accent-green: #10b981  /* Sucesso */
--accent-red: #ef4444    /* Erro */
```

### **Tipografia**
- **Família**: Inter + System fonts fallback
- **Escala**: 12px → 72px (responsiva)
- **Pesos**: 400, 500, 600, 700, 800

### **Espaçamento**
- Sistema baseado em múltiplos de 4px
- Escala: 4px → 128px
- Responsivo com clamp()

## 🚀 Início Rápido

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Git

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/artcalciolari/Uni-JalaUniversity/tree/main/Desenv.%20Web/Projeto%20Final/capstone-app

# Navegue para a pasta
cd capstone-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Scripts Disponíveis**

```bash
npm run dev        # Servidor desenvolvimento (localhost:5173)
npm run build      # Build de produção
npm run preview    # Preview do build
npm run lint       # Análise de código com ESLint
npm run docs       # Gerar documentação TypeDoc
npm run docs:watch # Documentação em modo watch
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── BookCard/        # Card de livro com navegação
│   ├── Header/          # Cabeçalho com busca
│   ├── BookDetails/     # Componentes de detalhes
│   │   ├── BookCover/   # Capa do livro
│   │   └── BookInfo/    # Informações do livro
│   ├── AuthorDetails/   # Detalhes do autor
│   ├── Footer/          # Rodapé da aplicação
│   └── Skeleton/        # Estados de loading
├── contexts/            # Context API
│   └── SearchContext.tsx # Estado global de busca
├── pages/               # Páginas da aplicação
│   ├── HomePage/        # Página inicial
│   └── BookDetailsPage/ # Página de detalhes
├── services/            # Integração com APIs
│   └── api.ts          # Hooks customizados
└── assets/             # Recursos estáticos
```

## 🔗 Integração com API

### **Open Library API**
O projeto integra com a [Open Library API](https://openlibrary.org/developers/api) para:

- **Busca de livros**: `/search.json`
- **Detalhes do livro**: `/works/{id}.json`
- **Informações do autor**: `/authors/{id}.json`
- **Capas**: `covers.openlibrary.org`

### **Hooks Customizados**

```typescript
// Hook para busca de livros
const { books, isLoading, searchBooks } = useBooks();

// Hook para detalhes do livro
const { bookDetails, isLoading } = useBookDetails(bookId);

// Hook para detalhes do autor
const { authorDetails, isLoadingAuthor } = useAuthorDetails(authorKey);
```

## 📚 Documentação

### **JSDoc + TypeDoc**
O projeto possui documentação completa gerada automaticamente:

```bash
# Gerar documentação
npm run docs

# Visualizar documentação
npm run docs:serve
```

A documentação inclui:
- ✅ **Interfaces TypeScript** completas
- ✅ **Exemplos de uso** de todos os componentes  
- ✅ **Categorização** por tipos (Components, Pages, Hooks)
- ✅ **Navegação** intuitiva e busca integrada

### **Padrões de Documentação**

Todos os componentes seguem o padrão JSDoc:

```typescript
/**
 * Componente que exibe um card com informações básicas de um livro.
 * Inclui navegação para página de detalhes ao clicar.
 * 
 * @param props - Propriedades do livro
 * @returns Elemento JSX do card do livro
 * 
 * @example
 * ```tsx
 * <BookCard
 *   id="/works/OL12345W"
 *   title="Dom Quixote"
 *   author="Miguel de Cervantes"
 *   cover_id={12345}
 * />
 * ```
 * 
 * @category Components
 */
```

## 🎯 Funcionalidades

### **✅ Implementadas**
- [x] Busca de livros em tempo real
- [x] Exibição de resultados em grid responsivo
- [x] Página de detalhes do livro
- [x] Informações do autor
- [x] Estados de loading com skeleton
- [x] Navegação com React Router
- [x] Design system completo
- [x] Documentação JSDoc/TypeDoc
- [x] Scroll to top entre páginas

### **Padrões de Commit**
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação/estilo
- `refactor:` Refatoração de código
- `test:` Adição de testes

## 👨‍💻 Autor

**Arthur Calciolari**
- GitHub: [@artcalciolari](https://github.com/artcalciolari)
- LinkedIn: [Arthur Calciolari](https://www.linkedin.com/in/arthur-calciolari-078138224/)
- Email: arthurcalciolari@gmail.com

---

<div align="center">

*Projeto desenvolvido durante o programa Jala University - Desenvolvimento Web*

</div>
```
