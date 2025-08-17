export interface IWeatherResolverResult {
  hourly: {
    time: string[];
    temperature_2m: number[] | null;
  }
  timezone: string | null;
  timezoneAbbreviation: string | null;
}