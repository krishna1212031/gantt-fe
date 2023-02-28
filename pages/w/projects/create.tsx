import { Button, CircularProgress, Grid, Paper, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useState } from "react";

type CreateProjectProps = {};

const addressLabelStyle = {
  marginTop: 3,
  marginLeft: 1
};

const ButtonContainer = styled(Box)(({ theme }) => {
  console.log(theme);
  return {
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  };
});

const Submit = styled(Button)({
  width: 200
});

const CreateProject: React.FC<CreateProjectProps> = () => {
  const [scheduledStartDate, setScheduledStartDate] = useState<moment.Moment | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          padding: "8px 14px",
          minHeight: "calc(100vh - 64px)"
        }
      }}
    >
      <Paper>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Project
        </Typography>

        <form>
          <Grid container columnSpacing={2}>
            <Grid item xs={6} md={4}>
              <TextField fullWidth margin="dense" label="Project Name *" id="name" error={false} helperText="Required" />
            </Grid>
            <Grid item xs={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  componentsProps={{ actionBar: { actions: ["clear"] } }}
                  label="Start Date *"
                  value={scheduledStartDate}
                  onChange={setScheduledStartDate}
                  renderInput={params => <TextField fullWidth margin="dense" {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={0} md={4}></Grid>
            <Grid item xs={12} md={8}>
              <TextField fullWidth label="Description" id="desc" margin="dense" error={false} helperText="Required" multiline rows={2} />
            </Grid>
            <Grid item xs={0} md={4}></Grid>
            <Grid item xs={6} md={4}>
              <TextField fullWidth label="Project Owner *" id="owner" margin="dense" error={false} helperText="Required" />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField fullWidth label="Client Name *" id="client" margin="dense" error={false} helperText="Required" />
            </Grid>
            <Grid item xs={0} md={4}></Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" component="h2" sx={addressLabelStyle}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField fullWidth label="Address Line 1 *" id="addressLine1" margin="dense" error={false} helperText="Required" />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField fullWidth label="Address Line 2" id="addressLine2" margin="dense" error={false} helperText="Required" />
            </Grid>
            <Grid item xs={0} md={4}></Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Pin Code *"
                id="pinCode"
                margin="dense"
                error={false}
                helperText="Required"
                InputProps={{
                  endAdornment: <CircularProgress size={20} />
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField fullWidth label="City *" id="city" margin="dense" disabled />
            </Grid>
            <Grid item xs={0} md={4}>
              <TextField fullWidth label="State *" id="state" margin="dense" disabled />
            </Grid>
          </Grid>
          <ButtonContainer>
            <Submit variant="contained" color="primary" size="large">
              Submit
            </Submit>
          </ButtonContainer>
        </form>
      </Paper>
    </Box>
  );
};
export default CreateProject;
