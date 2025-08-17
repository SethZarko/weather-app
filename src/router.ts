import { createBrowserRouter } from "react-router";
import App from './App'
import { WeatherComponent } from "./components/WeatherComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
        { index: true, Component: WeatherComponent }
    ]
  },
]);