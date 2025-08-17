// library imports
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

// type imports
import type { WeatherArgsInput } from "../types/WeatherArgsInput";
import type { IWeatherResolverResult } from "../types/IWeatherResolverResult";

// query imports
import { GET_WEATHER } from "../queries/GET_WEATHER";

// evn variables
const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

export function useWeather(_parent: string, args: WeatherArgsInput) {
  return useQuery<IWeatherResolverResult>({
    queryKey: ["weather", args.longitude, args.latitude],
    queryFn: async () => {
      const { weather } = (await request(endpoint, GET_WEATHER, {
        _parent,
        args,
      })) as { weather: IWeatherResolverResult };
      return weather;
    },
  });
}
