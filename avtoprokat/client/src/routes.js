import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import UserPage from "./pages/UserPage";
import CarPage from "./pages/CarPage";
import Basket from "./pages/Basket";
import CarPageAdmin from "./pages/CarPageAdmin";
import Applications from "./pages/Applications";
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
  APPLICATIONS_ROUTE,
  ADMIN_APPLICATIONS_ROUTE,
} from "./utils/consts";
import ApplicationPage from "./pages/ApplicationPage";
import AdminApplications from "./pages/AdminApplications";

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: USERPAGE_ROUTE,
    Component: UserPage,
  },
  {
    path: APPLICATIONS_ROUTE,
    Component: Applications,
  },
  {
    path: APPLICATIONS_ROUTE + "/:id",
    Component: ApplicationPage,
  },
];
export const adminRoutes = [
  {
    path: ADMIN_APPLICATIONS_ROUTE,
    Component: AdminApplications,
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: EDIT_CAR_ROUTE + "/:id",
    Component: CarPageAdmin,
  },
  {
    path: APPLICATIONS_ROUTE + "/:id",
    Component: ApplicationPage,
  },
];
export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
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
];
