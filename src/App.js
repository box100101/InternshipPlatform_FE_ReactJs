import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import AdminRouterLayout from "./Layouts/Admin/index";
import RegisterLayout from "./Layouts/Register/index";
import LoginLayout from "./Layouts/Login/index";
import Dashboard from "./pages/Admin/Dashboard";
import {
  adminRouter,
  candidateRouter,
  hrRouter,
  mainRouter,
  registerRouter,
} from "./config/routes";
import MainLayout from "./Layouts/Main";
import HRLayOut from "./Layouts/HR";
import ViewList from "./pages/Main/Candidate/ViewList";
import SaveProfile from "./pages/Main/Candidate/SaveProfile";

function App() {
  const renderAdminRouter = () => {
    return adminRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    });
  };

  const renderRegisterRouter = () => {
    return registerRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    });
  };

  const renderMainRouter = () => {
    return mainRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    });
  };

  const renderHrRouter = () => {
    return hrRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    });
  };

  const renderCandidateRouter = () => {
    return candidateRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    });
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminRouterLayout />}>
            <Route index element={<Dashboard />} />
            {renderAdminRouter()}
          </Route>
          <Route path="/register" element={<RegisterLayout />}>
            {renderRegisterRouter()}
          </Route>
          <Route path="/login" element={<LoginLayout />}></Route>
          <Route path="/hr" element={<HRLayOut />}>
            {/* <Route index element={<HR />} /> */}
            {renderHrRouter()}
          </Route>
          <Route path="/candidate/view-list" element={<ViewList />}></Route>
          <Route
            path="/candidate/save-profile"
            element={<SaveProfile />}
          ></Route>
          <Route path="/" element={<MainLayout />}>
            {/* <Route index element={<Home />} /> */}
            {renderMainRouter()}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
