import { getWeatherDescription, getWeatherIcon } from '../config/api';

const WeatherDisplay = ({ weatherData, isDarkMode, loading, error, onViewDetails, showDetailsView = false }) => 
{
  if (loading) 
  {
    return (
      <div className={`weather-display ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading">
          <div className="spinner" />
          <p>Carregando dados meteorológicos...</p>
        </div>
      </div>
    );
  }

  if (error) 
  {
    return (
      <div className={`weather-display ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="error">
          <h3>❌ Erro</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) 
  {
    return (
      <div className={`weather-display ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="welcome">
          <h2>🌤️ Painel Meteorológico</h2>
          <p>Digite o nome de uma cidade para ver as informações meteorológicas</p>
        </div>
      </div>
    );
  }

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ description, icon }],
    wind: { speed },
    sys: { country },
  } = weatherData;

  return (
    <div className={`weather-display ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="weather-card">
        <div className="weather-header">
          <h2>{name}, {country}</h2>
          <div className="weather-icon">
            {getWeatherIcon(icon)}
          </div>
        </div>
        
        <div className="weather-main">
          <div className="temperature">
            <span className="temp-value">{Math.round(temp)}°C</span>
            <p className="weather-description">{getWeatherDescription(description)}</p>
          </div>
          <p className="feels-like">Sensação térmica: {Math.round(feels_like)}°C</p>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">💧 Umidade:</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          {pressure && (
            <div className="detail-item">
              <span className="detail-label">📊 Pressão:</span>
              <span className="detail-value">{pressure} hPa</span>
            </div>
          )}
          <div className="detail-item">
            <span className="detail-label">💨 Vento:</span>
            <span className="detail-value">{speed} km/h</span>
          </div>
        </div>

        {onViewDetails && !showDetailsView && (
          <div className="weather-actions">
            <button 
              onClick={onViewDetails}
              className="details-button"
            >
              Ver Detalhes Completos →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;