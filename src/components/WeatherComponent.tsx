// type imports
import type { WeatherArgsInput } from "../types/WeatherArgsInput";

// hook imports
import { useWeather } from "../hooks/useWeather";

// Component
export const WeatherComponent: React.FC = (): React.ReactNode => {
  const args: WeatherArgsInput = {
    longitude: -81.1863513,
    latitude: 42.9982771,
  };

  const { data, error, isLoading } = useWeather("", args);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h3>Weather Data</h3>
      {data!.hourly.temperature_2m}
    </div>
  );
};
