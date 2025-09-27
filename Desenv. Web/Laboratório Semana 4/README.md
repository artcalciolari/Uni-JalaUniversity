# 🌤️ Painel Meteorológico

Uma aplicação web moderna de previsão do tempo construída com React, React Router e Vite. O projeto implementa funcionalidades avançadas como lazy loading, roteamento dinâmico e gerenciamento de estado com Context API.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [API Utilizada](#-api-utilizada)
- [Contribuição](#-contribuição)

## ✨ Funcionalidades

- 🔍 **Busca de Clima**: Pesquise condições meteorológicas por cidade
- 🌓 **Alternador de Tema**: Modo claro e escuro com persistência local
- 📱 **Design Responsivo**: Interface adaptável para diferentes dispositivos
- 🚀 **Carregamento Otimizado**: Lazy loading para melhor performance
- 🗺️ **Roteamento Dinâmico**: Navegação fluida entre páginas
- 💾 **Estado Persistente**: Preferências salvas no localStorage
- 🌍 **Dados em Tempo Real**: Informações meteorológicas atualizadas

## 🛠️ Tecnologias Utilizadas

- **React 19.1.1** - Biblioteca para construção da interface
- **React Router DOM 7.9.3** - Roteamento client-side
- **Vite 7.1.6** - Ferramenta de build e desenvolvimento
- **ESLint** - Linting e qualidade de código
- **Open-Meteo API** - Dados meteorológicos gratuitos
- **CSS3** - Estilização moderna com variáveis CSS

## 🏗️ Arquitetura do Projeto

### Componentes Principais

- **AppLayout**: Layout principal com navegação e footer
- **SearchBar**: Componente de busca por cidade
- **WeatherDisplay**: Exibição dos dados meteorológicos
- **ThemeSwitcher**: Alternador de temas

### Páginas

- **Home**: Página inicial com busca de clima
- **ForecastDetails**: Detalhes meteorológicos da cidade (rota dinâmica)
- **About**: Página sobre o projeto (lazy loaded)
- **NotFound**: Página 404 para rotas inexistentes

## 🚀 Funcionalidades Implementadas

### 1. **Lazy Loading**

A página "Sobre" é carregada de forma preguiçosa para melhorar a performance inicial:

```jsx
// Carregamento preguiçoso para a página About
const About = React.lazy(() => import('./pages/About'));

// Uso com Suspense para fallback
<Suspense fallback={<LoadingSpinner />}>
  <About />
</Suspense>
```

### 2. **Dynamic Routing**

Implementação de roteamento dinâmico para detalhes de previsão por cidade:

```jsx
// Rota dinâmica com parâmetro
<Route path="forecast/:city" element={<ForecastDetails />} />

// Uso do parâmetro na página
const { city } = useParams();
const decodedCity = decodeURIComponent(city);
```

### 3. **useContext - Gerenciamento de Estado**

Gerenciamento global de tema usando Context API:

```jsx
// Criação do contexto
const ThemeContext = createContext();

// Provider customizado
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Persistência no localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para uso do contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
```

### 4. **Custom Hooks**

- **useWeatherData**: Gerencia chamadas à API meteorológica
- **useFetch**: Hook genérico para requisições HTTP

### 5. **Estado Persistente**

O tema selecionado pelo usuário é salvo no localStorage e restaurado ao recarregar a aplicação.

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd "Laboratório Semana 4"
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra o navegador**
   - Acesse `http://localhost:5173`

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter ESLint

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AppLayout.jsx   # Layout principal
│   ├── SearchBar.jsx   # Barra de pesquisa
│   ├── ThemeSwitcher.jsx # Alternador de tema
│   └── WeatherDisplay.jsx # Exibição do clima
├── contexts/           # Contextos React
│   └── ThemeContext.jsx # Gerenciamento de tema
├── hooks/              # Hooks customizados
│   ├── useFetch.js     # Hook para requisições
│   └── useWeatherData.js # Hook para dados meteorológicos
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── About.jsx       # Página sobre (lazy loaded)
│   ├── ForecastDetails.jsx # Detalhes de previsão
│   └── NotFound.jsx    # Página 404
├── config/             # Configurações
│   └── api.js          # Configuração da API
└── assets/             # Recursos estáticos
```

## 🌐 API Utilizada

### Open-Meteo API

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Weather**: `https://api.open-meteo.com/v1/forecast`

#### Características:
- ✅ Gratuita e sem necessidade de chave API
- ✅ Dados meteorológicos em tempo real
- ✅ Suporte a múltipllos idiomas
- ✅ Geocodificação integrada

### Exemplo de Uso

```javascript
// Busca por coordenadas da cidade
const buildGeocodingUrl = (city) => {
  return `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
};

// Busca dados meteorológicos
const buildWeatherApiUrl = (latitude, longitude) => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    timezone: 'auto',
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
};
```

## 🎨 Funcionalidades de UI/UX

### Temas
- **Modo Claro**: Interface clean com cores suaves
- **Modo Escuro**: Interface moderna com fundo escuro
- **Transições Suaves**: Animações CSS para mudanças de tema

### Responsividade
- Design adaptável para desktop, tablet e mobile
- Grid system flexível
- Componentes que se ajustam automaticamente

### Estados de Loading
- Indicadores visuais durante carregamentos
- Fallbacks para lazy loading
- Tratamento de estados de erro

## 🧪 Padrões Implementados

- **Component Composition**: Estrutura modular de componentes
- **Custom Hooks**: Lógica reutilizável encapsulada
- **Context Pattern**: Gerenciamento de estado global
- **Error Boundaries**: Tratamento gracioso de erros
- **Lazy Loading**: Otimização de performance

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte do Laboratório Semana 4 da Jala University.

---

**Desenvolvido com ❤️ usando React e Vite**