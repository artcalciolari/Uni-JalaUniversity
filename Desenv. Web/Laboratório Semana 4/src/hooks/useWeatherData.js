import { useState, useCallback, useEffect } from 'react';
import useFetch from './useFetch';
import { buildGeocodingUrl, buildWeatherApiUrl } from '../config/api';

const useWeatherData = () => 
{
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch para geocoding
  const geocodingUrl = city ? buildGeocodingUrl(city) : null;
  const { data: geocodingData, isLoading: geocodingLoading, error: geocodingError } = useFetch(geocodingUrl);

  // Estado para coordenadas
  const [coordinates, setCoordinates] = useState(null);

  // Fetch para dados meteorológicos
  const weatherUrl = coordinates ? 
    buildWeatherApiUrl(coordinates.latitude, coordinates.longitude) : null;
  const { data: rawWeatherData, isLoading: weatherLoading, error: weatherError } = useFetch(weatherUrl);

  // Função para buscar dados meteorológicos de uma cidade
  const fetchWeatherData = useCallback(async(cityName) => 
  {
    setCity(cityName);
    setError(null);
    setWeatherData(null);
    setCoordinates(null);
  }, []);

  // Processar dados de geocoding
  useEffect(() => 
  {
    if (geocodingData && !geocodingError) 
    {
      if (!geocodingData.results || geocodingData.results.length === 0) 
      {
        setError('Cidade não encontrada. Verifique o nome e tente novamente.');
        return;
      }

      const { latitude, longitude, name, country } = geocodingData.results[0];
      setCoordinates({ latitude, longitude, name, country });
    }
    else if (geocodingError) 
    {
      setError('Erro ao buscar localização da cidade.');
    }
  }, [geocodingData, geocodingError]);

  // Processar dados meteorológicos
  useEffect(() => 
  {
    if (rawWeatherData && coordinates && !weatherError) 
    {
      const transformedData = {
        name: coordinates.name,
        sys: { country: coordinates.country },
        main: {
          temp: rawWeatherData.current.temperature_2m,
          feels_like: rawWeatherData.current.apparent_temperature,
          humidity: rawWeatherData.current.relative_humidity_2m,
          pressure: null, // Open-Meteo não fornece pressão no plano gratuito
        },
        weather: [{
          description: rawWeatherData.current.weather_code,
          icon: rawWeatherData.current.weather_code,
        }],
        wind: {
          speed: rawWeatherData.current.wind_speed_10m,
        },
      };
      
      setWeatherData(transformedData);
    }
    else if (weatherError) 
    {
      setError('Erro ao buscar dados meteorológicos. Tente novamente.');
    }
  }, [rawWeatherData, coordinates, weatherError]);

  // Combininar estados de loading
  const combinedLoading = geocodingLoading || weatherLoading;

  return {
    weatherData,
    isLoading: combinedLoading,
    error,
    fetchWeatherData,
  };
};

export default useWeatherData;