import { Check } from "@mui/icons-material";
import { Button, styled, Typography } from "@mui/material";
import React from "react";

type SuccessProps = {
  message: string;
  onOk: (e: React.MouseEvent) => void;
};

const Background = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: "50%",
  borderColor: theme.palette.success.main,
  borderStyle: "solid",
  borderWidth: 2,
  marginRight: theme.spacing(1)

}))

const Success: React.FC<SuccessProps> = ({ message, onOk }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        <Background>
          <Check color="success" />
        </Background>
        Success
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
        {message}
      </Typography>
      <Button variant="contained" onClick={onOk}>
        OK
      </Button>
    </div>
  );
};
export default Success;
