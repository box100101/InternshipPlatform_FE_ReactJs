import React, { useEffect, useState} from 'react'
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import LoginAdminContainer from "../../containers/LoginAdminContainer";
import "./styles.scss";
// import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateStatusRegister } from "src/store/slices/main/register/registerSlice";
import Modal from "./../../components/Modal/index";
import "./styles.scss";

const LoginAdminLayout = () => {
  const { status } = useSelector((state) => state.register);
  console.log(status)

  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (status === "success") {
      setOpen(true);
    }
  }, [status]);

  // const handleClose = () => {
  //   setOpen(false);
  //   dispatch(updateStatusRegister("idle"));
  // };

  return (
    <div className="login-layout">
      <Header />
      <div className="login-container-wrapper">
        <LoginAdminContainer />
        <div className="login-container__modal">
          <Modal
            modalTitle="Thông báo"
            open={open}
            setOpen={setOpen}
            // children={
            //   <ModalContent
            //     onClick={handleClose}
            //     nameButton="Đồng ý"
            //     className="login-container__modal--content"
            //   />
            // }
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginAdminLayout