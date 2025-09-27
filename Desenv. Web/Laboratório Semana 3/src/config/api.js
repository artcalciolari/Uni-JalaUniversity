// Configuração da API Open-Meteo
// API gratuita que não requer chave: https://open-meteo.com/

export const API_CONFIG = {
  GEOCODING_URL: 'https://geocoding-api.open-meteo.com/v1/search',
  WEATHER_URL: 'https://api.open-meteo.com/v1/forecast',
  DEFAULT_PARAMS: {
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    timezone: 'auto',
  },
};

// Função para buscar coordenadas da cidade
export const buildGeocodingUrl = (city) => 
{
  const { GEOCODING_URL } = API_CONFIG;
  return `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
};

// Função para buscar dados meteorológicos
export const buildWeatherApiUrl = (latitude, longitude) => 
{
  const { WEATHER_URL, DEFAULT_PARAMS } = API_CONFIG;
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    ...DEFAULT_PARAMS,
  });
  return `${WEATHER_URL}?${params.toString()}`;
};

// Mapeamento dos códigos de clima da Open-Meteo
export const getWeatherDescription = (weatherCode) => 
{
  const weatherDescriptions = {
    0: 'Céu limpo',
    1: 'Predominantemente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Neblina',
    48: 'Neblina com geada',
    51: 'Garoa leve',
    53: 'Garoa moderada',
    55: 'Garoa intensa',
    61: 'Chuva leve',
    63: 'Chuva moderada',
    65: 'Chuva intensa',
    71: 'Neve leve',
    73: 'Neve moderada',
    75: 'Neve intensa',
    77: 'Granizo',
    80: 'Pancadas de chuva leves',
    81: 'Pancadas de chuva moderadas',
    82: 'Pancadas de chuva intensas',
    85: 'Pancadas de neve leves',
    86: 'Pancadas de neve intensas',
    95: 'Tempestade',
    96: 'Tempestade com granizo leve',
    99: 'Tempestade com granizo intenso',
  };
  return weatherDescriptions[weatherCode] || 'Condição desconhecida';
};

// Função para obter ícone baseado no código do clima
export const getWeatherIcon = (weatherCode) => 
{
  const weatherIcons = {
    0: '☀️',   // Céu limpo
    1: '🌤️',   // Predominantemente limpo
    2: '⛅',   // Parcialmente nublado
    3: '☁️',   // Nublado
    45: '🌫️',  // Neblina
    48: '🌫️',  // Neblina com geada
    51: '🌦️',  // Garoa leve
    53: '🌦️',  // Garoa moderada
    55: '🌧️',  // Garoa intensa
    61: '🌧️',  // Chuva leve
    63: '🌧️',  // Chuva moderada
    65: '🌧️',  // Chuva intensa
    71: '❄️',  // Neve leve
    73: '❄️',  // Neve moderada
    75: '❄️',  // Neve intensa
    77: '🧊',  // Granizo
    80: '🌦️',  // Pancadas de chuva leves
    81: '🌧️',  // Pancadas de chuva moderadas
    82: '⛈️',  // Pancadas de chuva intensas
    85: '🌨️',  // Pancadas de neve leves
    86: '🌨️',  // Pancadas de neve intensas
    95: '⛈️',  // Tempestade
    96: '⛈️',  // Tempestade com granizo leve
    99: '⛈️',   // Tempestade com granizo intenso
  };
  return weatherIcons[weatherCode] || '🌤️';
};