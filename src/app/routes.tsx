import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomeScreen } from "./screens/HomeScreen";
import { MapScreen } from "./screens/MapScreen";
import { PublishScreen } from "./screens/PublishScreen";
import { ShopScreen } from "./screens/ShopScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { TeamScreen } from "./screens/TeamScreen";
import { TeamDetailScreen } from "./screens/TeamDetailScreen";
import { CampDetailScreen } from "./screens/CampDetailScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomeScreen },
      { path: "map", Component: MapScreen },
      { path: "team", Component: TeamScreen },
      { path: "profile", Component: ProfileScreen },
    ],
  },
  { path: "/publish", Component: PublishScreen },
  { path: "/shop", Component: ShopScreen },
  { path: "/team-detail", Component: TeamDetailScreen },
  { path: "/camp-detail", Component: CampDetailScreen },
]);
