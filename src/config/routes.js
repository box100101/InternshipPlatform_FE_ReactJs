import Dashboard from "../pages/Admin/Dashboard";
import User from "../pages/Admin/User";
import Company from "../pages/Admin/Company";
import University from "../pages/Admin/University";
import NotFound from "../pages/NotFound";
import { RegisterStep1, RegisterStep2 } from '../pages/Register/index'
export const adminRouter = [
  {
    path: "dashboard",
    Component: Dashboard,
  },
  {
    path: "user",
    Component: User,
  },
  {
    path: "university",
    Component: University,
  },
  {
    path: "company",
    Component: Company,
  },
  {
    path: "*",
    Component: NotFound,
  },
];

// main router
export const mainRouter = [];

// register router
export const registerRouter = [
  {
    path: "",
    Component: RegisterStep1
  },
  {
    path: "step2/:roleId",
    Component: RegisterStep2
  }
];
