const  getForecastEmoji = (iconName) =>{
    switch (iconName) {
      case "clear-day":
        return "weather-sunny";
      case "clear-night":
        return "weather-night";
      case "rain":
        return "weather-pouring";
      case "snow":
        return "weather-snowy";
      case "sleet":
        return "weather-snowy-heavy";
      case "wind":
        return "weather-windy";
      case "fog":
        return "🌫";
      case "cloudy":
        return "weather-cloudy";
      case "partly-cloudy-day":
        return "weather-partly-cloudy";
      case "partly-cloudy-night":
        return "weather-night-partly-cloudy";
      case "error":
        return "weather-sunny-off";
      default:
        return "weather-partly-cloudy";
    }
  }
  export default getForecastEmoji