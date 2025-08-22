// library imports
import { useState } from 'react'

// type imports
import type { WeatherArgsInput } from "../types/WeatherArgsInput";
import type { IWeatherForm } from '../types/IWeatherForm';

// hook imports
import { useWeather } from "../hooks/useWeather";
import { Button, TextField } from '@mui/material';

// env variable imports
const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY

// Component
export const WeatherComponent: React.FC = (): React.ReactNode => {
  // state init
  const [formState, setFormState] = useState<IWeatherForm>({
    city: '',
    province: ''
  })
  const [longitude, setLongitude] = useState<number>(0)
  const [latitude, setLatitude] = useState<number>(0)
  const [formattedLocation, setFormattedLocation] = useState<string>('')

   // controlled state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev: IWeatherForm) => ({...prev, [name]: value }) )
  }

  // geocoding location function - handled by form
  const getLocation = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=locality:${formState.city}|administrative_area:${formState.province}&key=${apiKey}`, {
      method: 'GET'
    })
    const data = await res.json()
    const dataArray = data.results[0]

    const longitudeData: number = dataArray?.geometry?.location?.lng
    setLongitude(longitudeData)

    const latitudeData: number = dataArray?.geometry?.location?.lat
    setLatitude(latitudeData)

    const formattedLocationData: string = dataArray?.formatted_address
    setFormattedLocation(formattedLocationData);

    setFormState( {
      city: '',
      province: ''
    })
  }

  // GQL query arguments
  const args: WeatherArgsInput = {
    longitude: longitude,
    latitude: latitude,
  };

  // call query hook
  const { data, error, isLoading } = useWeather("", args);

  // JSX
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <form onSubmit={getLocation}>
          <TextField 
            type="text"
            name="city" 
            variant="outlined"
            label="City"
            value={formState.city}
            onChange={handleChange}
          />

          <TextField 
            type="text"
            name="province" 
            variant="outlined"
            label="Province"
            value={formState.province}
            onChange={handleChange}
          />

          <Button variant="outlined">Submit</Button>
      </form>
      <h3>Weather Data</h3>
      {data!.hourly?.temperature_2m}

      <br />

      {formattedLocation}
    </div>
  );
};
