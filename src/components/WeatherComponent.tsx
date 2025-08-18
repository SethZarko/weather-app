// library imports
import { useState, useEffect, useCallback } from 'react'

// type imports
import type { WeatherArgsInput } from "../types/WeatherArgsInput";
import type { IgeoLocate } from '../types/IgeoLocation';

// hook imports
import { useWeather } from "../hooks/useWeather";

// env variable imports
const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY

// Component
export const WeatherComponent: React.FC = (): React.ReactNode => {
  // state init
  const [city, setCity] = useState<string>('')
  const [province, setProvince] = useState<string>('')

  // query arguments
  const args: WeatherArgsInput = {
    longitude: -81.18518989190285,
    latitude: 42.99548141899535,
  };

  // call query hook
  const { data, error, isLoading } = useWeather("", args);

  // geocoding location function
  const getLocation = useCallback(async () => {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${args.latitude},${args.longitude}&key=${apiKey}`, {
      method: 'GET'
    })
    const data = await res.json()
    const dataArray = data.results[0].address_components

    const city = dataArray.filter((elem: IgeoLocate) => (
      elem.types.includes('locality') ? elem.long_name : ''
    )).map((elem: IgeoLocate) => elem.long_name)[0]
    setCity(city)

    const province = dataArray.filter((elem: IgeoLocate) => (
      elem.types.includes('administrative_area_level_1') ? elem.long_name : ''
    )).map((elem: IgeoLocate) => elem.long_name)[0]
    setProvince(province)
  }, [args.latitude, args.longitude])

  // call getLocation on render
  useEffect(() => {
    getLocation()
  }, [getLocation])

  // JSX
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h3>Weather Data</h3>
      {data!.hourly.temperature_2m}

      {city && province && `${city}, ${province}`}
    </div>
  );
};
