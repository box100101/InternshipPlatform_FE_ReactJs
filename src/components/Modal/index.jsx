import * as React from "react";
import {
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = ({ modalTitle, open, setOpen, children }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
