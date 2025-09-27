import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ThemeSwitcher from './components/ThemeSwitcher';
import { buildGeocodingUrl, buildWeatherApiUrl } from './config/api';
import './App.css';

function App() 
{
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Função para buscar dados meteorológicos
  const fetchWeatherData = async(city) => 
  {
    setLoading(true);
    setError(null);
    
    try 
    {
      // Primeiro, buscar as coordenadas da cidade
      const geocodingUrl = buildGeocodingUrl(city);
      const geocodingResponse = await fetch(geocodingUrl);
      
      if (!geocodingResponse.ok) 
      {
        throw new Error('Erro ao buscar localização da cidade.');
      }
      
      const geocodingData = await geocodingResponse.json();
      
      if (!geocodingData.results || geocodingData.results.length === 0) 
      {
        throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
      }
      
      const { latitude, longitude, name, country } = geocodingData.results[0];
      
      // Depois, buscar os dados meteorológicos
      const weatherUrl = buildWeatherApiUrl(latitude, longitude);
      const weatherResponse = await fetch(weatherUrl);
      
      if (!weatherResponse.ok) 
      {
        throw new Error('Erro ao buscar dados meteorológicos. Tente novamente.');
      }
      
      const weatherData = await weatherResponse.json();
      
      // Transformar os dados para o formato esperado pelo componente
      const transformedData = {
        name,
        sys: { country },
        main: {
          temp: weatherData.current.temperature_2m,
          feels_like: weatherData.current.apparent_temperature,
          humidity: weatherData.current.relative_humidity_2m,
          pressure: null, // Open-Meteo não fornece pressão no plano gratuito
        },
        weather: [{
          description: weatherData.current.weather_code,
          icon: weatherData.current.weather_code,
        }],
        wind: {
          speed: weatherData.current.wind_speed_10m,
        },
      };
      
      setWeatherData(transformedData);
    }
    catch (err) 
    {
      setError(err.message);
      setWeatherData(null);
    }
    finally 
    {
      setLoading(false);
    }
  };

  // useEffect para buscar dados quando searchQuery mudar
  useEffect(() => 
  {
    if (searchQuery) 
    {
      fetchWeatherData(searchQuery);
    }
  }, [searchQuery]);

  // Função chamada pelo SearchBar
  const handleSearch = (city) => 
  {
    setSearchQuery(city);
  };

  // Função para alternar tema
  const toggleTheme = () => 
  {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="container">
        <header className="app-header">
          <h1>🌤️ Painel Meteorológico</h1>
          <ThemeSwitcher 
            isDarkMode={isDarkMode} 
            onToggleTheme={toggleTheme} 
          />
        </header>

        <main className="app-main">
          <SearchBar 
            onSearch={handleSearch} 
            isDarkMode={isDarkMode}
          />
          
          <WeatherDisplay 
            weatherData={weatherData}
            isDarkMode={isDarkMode}
            loading={loading}
            error={error}
          />
        </main>

        <footer className="app-footer">
          <p>Dados fornecidos por Open-Meteo</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
