'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  location: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using Open-Meteo API (free, no API key needed)
    // Lagos coordinates: 6.5244°N, 3.3792°E
    fetch('https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current=temperature_2m,weather_code&timezone=Africa%2FLagos')
      .then(res => res.json())
      .then(data => {
        const weatherCode = data.current.weather_code;
        const temp = Math.round(data.current.temperature_2m);
        
        // Map weather codes to simple conditions
        let condition = 'Clear';
        let icon = '☀️';
        
        if (weatherCode === 0) {
          condition = 'Clear';
          icon = '☀️';
        } else if (weatherCode <= 3) {
          condition = 'Cloudy';
          icon = '⛅';
        } else if (weatherCode <= 67) {
          condition = 'Rainy';
          icon = '🌧️';
        } else if (weatherCode <= 77) {
          condition = 'Snowy';
          icon = '🌨️';
        } else {
          condition = 'Stormy';
          icon = '⛈️';
        }
        
        setWeather({
          temp,
          condition,
          icon,
          location: 'Lagos'
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-card/50 rounded-lg border border-border">
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-card/50 rounded-lg border border-border hover:border-primary/20 transition-colors">
      <span className="text-lg leading-none">{weather.icon}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-primary">{weather.temp}°C</span>
        <span className="text-xs text-secondary">{weather.location}</span>
      </div>
    </div>
  );
}
