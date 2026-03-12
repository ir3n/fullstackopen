import { useWeather } from "../hooks/useWeather";

const Weather = ({ city }) => {
  const { weather, isLoading, error } = useWeather(city);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>{`Weather in ${city}`}</h3>
      {!!weather && (
        <>
          <p>{`Temperature ${weather.temp} Celsius`}</p>
          <img src={weather.icon.src} alt={weather.icon.alt} />
          <p>{`Wind ${weather.wind} m/s`}</p>
        </>
      )}
    </div>
  );
};

export default Weather;
