import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "68df3d7047c69325f4df3d75f996522b";
  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setTemp(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setTemp(data.main.temp);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Weather App 🌤️</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={getWeather} style={{ padding: "8px 16px" }}>
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {temp && <p>The temperature in {city} is {temp}°C</p>}
    </div>
  );
}