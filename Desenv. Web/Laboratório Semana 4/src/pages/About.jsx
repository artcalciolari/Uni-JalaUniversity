import { useTheme } from '../contexts/ThemeContext';
import './About.css';

const About = () => 
{
  const { isDarkMode } = useTheme();

  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-header">
          <h1>Sobre o Painel Meteorológico</h1>
          <p className="about-subtitle">
            Uma aplicação moderna para consulta de dados meteorológicos
          </p>
        </header>

        <section className="about-content">
          <div className="about-section">
            <h2>🌟 Características</h2>
            <ul className="features-list">
              <li>
                <strong>Dados em Tempo Real:</strong> Informações meteorológicas atualizadas fornecidas pela API Open-Meteo
              </li>
              <li>
                <strong>Interface Responsiva:</strong> Design adaptativo que funciona perfeitamente em dispositivos móveis e desktop
              </li>
              <li>
                <strong>Temas Personalizáveis:</strong> Alterne entre modo claro e escuro conforme sua preferência
              </li>
              <li>
                <strong>Navegação Intuitiva:</strong> Sistema de roteamento com React Router para uma experiência fluida
              </li>
              <li>
                <strong>Busca Inteligente:</strong> Encontre informações meteorológicas para qualquer cidade do mundo
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h2>🛠️ Tecnologias Utilizadas</h2>
            <div className="tech-grid">
              <div className="tech-card">
                <h3>React</h3>
                <p>Biblioteca JavaScript para construção da interface de usuário</p>
              </div>
              <div className="tech-card">
                <h3>React Router</h3>
                <p>Sistema de roteamento para navegação entre páginas</p>
              </div>
              <div className="tech-card">
                <h3>Context API</h3>
                <p>Gerenciamento de estado global para temas e configurações</p>
              </div>
              <div className="tech-card">
                <h3>Custom Hooks</h3>
                <p>Hooks personalizados para reutilização de lógica</p>
              </div>
              <div className="tech-card">
                <h3>Open-Meteo API</h3>
                <p>API gratuita para dados meteorológicos precisos</p>
              </div>
              <div className="tech-card">
                <h3>CSS Modules</h3>
                <p>Estilização modular e responsiva</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>📊 Dados Fornecidos</h2>
            <div className="data-info">
              <p>
                Nossa aplicação utiliza a API Open-Meteo, que fornece dados meteorológicos 
                gratuitos e de alta qualidade. Os dados incluem:
              </p>
              <div className="data-list">
                <span className="data-item">🌡️ Temperatura atual e sensação térmica</span>
                <span className="data-item">💧 Umidade relativa do ar</span>
                <span className="data-item">💨 Velocidade do vento</span>
                <span className="data-item">🌤️ Condições meteorológicas</span>
                <span className="data-item">📍 Localização precisa por geocodificação</span>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>🚀 Funcionalidades</h2>
            <div className="functionality-grid">
              <div className="func-card">
                <h3>Busca por Cidade</h3>
                <p>Digite o nome de qualquer cidade para obter informações meteorológicas instantâneas</p>
              </div>
              <div className="func-card">
                <h3>Detalhes Expandidos</h3>
                <p>Visualize informações detalhadas em uma página dedicada para cada cidade</p>
              </div>
              <div className="func-card">
                <h3>Tema Adaptável</h3>
                <p>Alterne entre modo claro e escuro, com preferência salva automaticamente</p>
              </div>
              <div className="func-card">
                <h3>Design Responsivo</h3>
                <p>Interface otimizada para todos os tamanhos de tela e dispositivos</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="about-footer">
          <p>
            Desenvolvido como parte do Laboratório de Desenvolvimento Web - Semana 4
          </p>
          <p>
            <strong>Dados meteorológicos fornecidos por:</strong> 
            <a 
              href="https://open-meteo.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="api-link"
            >
              Open-Meteo
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;