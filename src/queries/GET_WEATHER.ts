import { gql } from 'graphql-request';

export const GET_WEATHER = gql`
  query GetWeather($_parent: Any!, $args: WeatherArgsInput!) {
    weather(_parent: $_parent, args: $args) {
      hourly{
        time
        temperature_2m
      },
      timezone,
      timezoneAbbreviation
    }
  }
`;