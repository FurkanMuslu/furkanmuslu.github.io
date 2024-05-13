async function getWeatherData(lat, lon) {
    lat = encodeURIComponent(lat);
    lon = encodeURIComponent(lon);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,showers,snowfall,weather_code&timezone=Europe%2FMoscow`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
}

async function getPlaceData(placeName) {
    placeName = encodeURIComponent(placeName);
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${placeName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  }