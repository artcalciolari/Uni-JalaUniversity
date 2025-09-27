import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import WeatherDisplay from '../components/WeatherDisplay';
import useWeatherData from '../hooks/useWeatherData';
import { useTheme } from '../contexts/ThemeContext';
import './ForecastDetails.css';

const ForecastDetails = () => 
{
  const { city } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { weatherData, isLoading, error, fetchWeatherData } = useWeatherData();
  const [decodedCity, setDecodedCity] = useState('');

  useEffect(() => 
  {
    if (city) 
    {
      const decoded = decodeURIComponent(city);
      setDecodedCity(decoded);
      fetchWeatherData(decoded);
    }
  }, [city, fetchWeatherData]);

  const handleBackClick = () => 
  {
    navigate(-1); // Voltar à página anterior
  };

  if (error) 
  {
    return (
      <div className="forecast-details">
        <div className="error-container">
          <h2>Erro ao carregar dados</h2>
          <p>{error}</p>
          <div className="action-buttons">
            <button onClick={handleBackClick} className="back-button">
              ← Voltar
            </button>
            <Link to="/" className="home-button">
              🏠 Ir para Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forecast-details">
      <div className="details-header">
        <button onClick={handleBackClick} className="back-button">
          ← Voltar
        </button>
        <h1>Detalhes do Clima - {decodedCity}</h1>
      </div>

      <div className="details-content">
        <WeatherDisplay 
          weatherData={weatherData}
          isDarkMode={isDarkMode}
          loading={isLoading}
          error={error}
          showDetailsView
        />
        
        {weatherData && (
          <div className="additional-info">
            <h3>Informações Adicionais</h3>
            <div className="info-grid">
              <div className="info-card">
                <h4>Localização</h4>
                <p>{weatherData.name}, {weatherData.sys.country}</p>
              </div>
              <div className="info-card">
                <h4>Sensação Térmica</h4>
                <p>{weatherData.main.feels_like}°C</p>
              </div>
              <div className="info-card">
                <h4>Umidade</h4>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="info-card">
                <h4>Velocidade do Vento</h4>
                <p>{weatherData.wind.speed} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastDetails;