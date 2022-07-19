import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
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
  partnerRouter,
} from "./config/routes";
import MainLayout from "./Layouts/Main";
import HRLayOut from "./Layouts/HR";
import { RegisterStep1 } from "./pages/Register";
import CandidateInfo from "./pages/Register/RegisterStep3/CandidateInfo";
import HRInfo from "./pages/Register/RegisterStep3/HRInfo";
import ViewList from "./pages/Main/Candidate/ViewList";
import SaveProfile from "./pages/Main/Candidate/SaveProfile";
import CandidateLayOut from "./Layouts/Candidate";
import PartnerLayout from "./Layouts/Partner";

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

  const renderPartnerRouter = () => {
    return partnerRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    })
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminRouterLayout />}>
            <Route index element={<Dashboard />} />
            {renderAdminRouter()}
          </Route>
          <Route path="/register" element={<RegisterLayout />}>
            <Route index element={<RegisterStep1 />} />
            {renderRegisterRouter()}
          </Route>
          <Route path="/login" element={<LoginLayout />}></Route>
          <Route path="/hr" element={<HRLayOut />}>
            {renderHrRouter()}
          </Route>
          <Route path="/candidate" element={<CandidateLayOut />}>
            {/* <Route index element={<HR />} /> */}
            {renderCandidateRouter()}
          </Route>
          <Route path="/partner" element={<PartnerLayout />}>
            {renderPartnerRouter()}
          </Route>
          <Route path="/" element={<MainLayout />}>
            {renderMainRouter()}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
