import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import useWeatherData from '../hooks/useWeatherData';
import { useTheme } from '../contexts/ThemeContext';
import './Home.css';

const Home = () => 
{
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { weatherData, isLoading, error, fetchWeatherData } = useWeatherData();

  const handleSearch = (city) => 
  {
    fetchWeatherData(city);
  };

  const handleViewDetails = (city) => 
  {
    // Navegar para a página de detalhes com o nome da cidade
    navigate(`/forecast/${encodeURIComponent(city)}`);
  };

  return (
    <div className="home-page">
      <div className="search-section">
        <h2>Consultar Clima</h2>
        <p>Digite o nome de uma cidade para ver as condições meteorológicas atuais</p>
        <SearchBar 
          onSearch={handleSearch} 
          isDarkMode={isDarkMode}
        />
      </div>
      
      <div className="weather-section">
        <WeatherDisplay 
          weatherData={weatherData}
          isDarkMode={isDarkMode}
          loading={isLoading}
          error={error}
          onViewDetails={weatherData ? () => handleViewDetails(weatherData.name) : null}
        />
      </div>
    </div>
  );
};

export default Home;