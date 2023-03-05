import { Box, Button, CircularProgress, Grid, styled, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type CreateFormProps = {};

const addressLabelStyle = {
  marginTop: 3,
  marginLeft: 1
};

const ButtonContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const Submit = styled(Button)({
  width: 200
});

const CreateForm: React.FC<CreateFormProps> = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2}>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Project Name *"
            id="name"
            margin="dense"
            {...register("name", { required: true })}
            error={false}
            helperText="Required"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <Controller
            name="scheduledStartDate"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  inputFormat="MM/DD/YYYY"
                  componentsProps={{ actionBar: { actions: ["clear"] } }}
                  label="Start Date *"
                  value={field.value}
                  onChange={field.onChange}
                  renderInput={params => <TextField fullWidth size="small" margin="dense" id="scheduledStartDate" {...params} />}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            size="small"
            label="Description"
            id="desc"
            margin="dense"
            {...register("desc")}
            error={false}
            helperText="Required"
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Project Owner *"
            id="owner"
            margin="dense"
            {...register("owner")}
            error={false}
            helperText="Required"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Client Name *"
            id="client"
            margin="dense"
            {...register("client")}
            error={false}
            helperText="Required"
          />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" component="h2" sx={addressLabelStyle}>
            Address
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Address Line 1 *"
            id="addressLine1"
            margin="dense"
            {...register("address.address1")}
            error={false}
            helperText="Required"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Address Line 2"
            id="addressLine2"
            margin="dense"
            {...register("address.address2")}
            error={false}
            helperText="Required"
          />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Pin Code *"
            id="pinCode"
            margin="dense"
            {...register("address.pinCode")}
            error={false}
            helperText="Required"
            InputProps={{
              endAdornment: <CircularProgress size={20} />
            }}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField fullWidth size="small" label="City *" id="city" margin="dense" {...register("address.city")} disabled />
        </Grid>
        <Grid item xs={0} md={4}>
          <TextField fullWidth size="small" label="State *" id="state" margin="dense" {...register("address.state")} disabled />
        </Grid>
      </Grid>
      <ButtonContainer>
        <Submit type="submit" variant="contained" color="primary" size="large">
          Submit
        </Submit>
      </ButtonContainer>
    </form>
  );
};
export default CreateForm;
