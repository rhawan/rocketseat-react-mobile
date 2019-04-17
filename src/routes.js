import {
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import Main from "./pages/Main";
import Box from "./pages/Box";
import BoxList from "./pages/BoxList";

const Routes = createAppContainer(
  createSwitchNavigator({
    Main,
    Box,
    BoxList
  })
);

export default Routes;
