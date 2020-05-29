const  getForecastEmoji = (iconName) =>{
    switch (iconName) {
      case "clear-day":
        return "☀️";
      case "clear-night":
        return "🌜";
      case "rain":
        return "🌧";
      case "snow":
        return "❄️";
      case "sleet":
        return "⛸";
      case "wind":
        return "💨";
      case "fog":
        return "🌫";
      case "cloudy":
        return "☁️";
      case "partly-cloudy-day":
        return "🌤";
      case "partly-cloudy-night":
        return "🌥";
      case "error":
        return "😢";
      default:
        return "🌤";
    }
  }
  export default getForecastEmoji