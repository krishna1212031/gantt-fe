import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, styled, Typography } from "@mui/material";
import React from "react";
import CreateForm from "./createForm";
import Error from "./error";
import Success from "./success";

type CreateProps = {
  open: boolean;
  onClose: (e: React.MouseEvent, reason?: "escapeKeyDown" | "backdropClick") => void;
};

type FormState = "edit" | "success" | "error";

const boxStyle = (state: FormState) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: state === "edit" ? 1000 : 500,
  maxHeight: "90%",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  py: 2,
  px: 4
});

const closeStyle = {
  position: "absolute",
  top: 8,
  right: 8
};

const ModalHeading = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between"
}));

const Create: React.FC<CreateProps> = ({ open, onClose }) => {
  const [state, setState] = React.useState<FormState>("edit");
  const [message, setMessage] = React.useState<string | undefined>();

  const onSuccess = (message: string) => {
    setState("success");
    setMessage(message);
  };

  const onError = (message: string) => {
    setState("error");
    setMessage(message);
  };

  const handleClose = (e: React.MouseEvent, reason?: "escapeKeyDown" | "backdropClick") => {
    setState("edit");
    onClose(e, reason);
  };

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown>
      <Box sx={boxStyle(state)}>
        <ModalHeading>
          {state === "edit" && (
            <Typography variant="h4" component="h2" gutterBottom>
              Create Project
            </Typography>
          )}
          <IconButton onClick={handleClose} size="small" sx={closeStyle}>
            <Close fontSize="inherit" />
          </IconButton>
        </ModalHeading>

        <CreateForm show={state === "edit"} onSuccess={onSuccess} onError={onError} />
        {state === "success" && <Success message={message!} onOk={handleClose} />}
        {state === "error" && <Error message={message!} onClose={handleClose} onRetry={() => setState("edit")} />}
      </Box>
    </Modal>
  );
};
export default Create;
