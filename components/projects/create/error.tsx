import { Close } from "@mui/icons-material";
import { Button, styled, Typography } from "@mui/material";
import React from "react";

type ErrorProps = {
  message: string;
  onClose: (e: React.MouseEvent) => void;
  onRetry: (e: React.MouseEvent) => void;
};

const Background = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: "50%",
  borderColor: theme.palette.error.main,
  borderStyle: "solid",
  borderWidth: 2,
  marginRight: theme.spacing(1)
}));

const Error: React.FC<ErrorProps> = ({ message, onClose, onRetry }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        <Background>
          <Close color="error" />
        </Background>
        Oops!
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
        {message}
      </Typography>
      <Button variant="outlined" sx={{ mr: 1 }} onClick={onClose}>
        Close
      </Button>
      <Button variant="contained" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
};
export default Error;
