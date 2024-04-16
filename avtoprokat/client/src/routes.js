import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import UserPage from "./pages/UserPage";
import CarPage from "./pages/CarPage";
import Basket from "./pages/Basket";
import CarPageAdmin from "./pages/CarPageAdmin";

import Shop from "./pages/Shop";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CAR_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  USERPAGE_ROUTE,
  EDIT_CAR_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];
export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: USERPAGE_ROUTE,
    Component: UserPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: CAR_ROUTE + "/:id",
    Component: CarPage,
  },
  {
    path: EDIT_CAR_ROUTE + "/:id",
    Component: CarPageAdmin,
  },
];
