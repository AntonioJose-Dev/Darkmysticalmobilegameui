import { createHashRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { StageMap } from "./components/StageMap";
import { Combat } from "./components/Combat";
import { Profile } from "./components/Profile";
import { Inventory } from "./components/Inventory";

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "map", Component: StageMap },
      { path: "combat/:stageId", Component: Combat },
      { path: "profile", Component: Profile },
      { path: "inventory", Component: Inventory },
    ],
  },
]);
