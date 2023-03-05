import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper, styled, Typography } from "@mui/material";
import React from "react";
import CreateForm from "./createForm";

type CreateProps = {
  open: boolean;
  onClose: (e: React.MouseEvent, reason?: "escapeKeyDown" | "backdropClick") => void;
};

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 1000,
  maxHeight: "90%",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  py: 2,
  px: 4
};

const closeStyle = {
  marginRight: -3,
  marginTop: -3,
}

const ModalHeading = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between"
}));

const Create: React.FC<CreateProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown>
      <Box sx={boxStyle}>
        <ModalHeading>
          <Typography variant="h5" component="h2" gutterBottom>
            Create Project
          </Typography>
          <IconButton onClick={onClose} size="small" sx={closeStyle}>
            <Close fontSize="inherit" />
          </IconButton>
        </ModalHeading>
        <CreateForm />
      </Box>
    </Modal>
  );
};
export default Create;
