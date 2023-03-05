import { Box, Button, CircularProgress, Grid, styled, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { Controller, FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IAddress } from "../../../interfaces/commonInterfaces";

type CreateFormProps = {};
type a = keyof IAddress;

type IAddressError = {
  [x in keyof IAddress]: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

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

const validationSchema = yup.object({
  name: yup.string().required("Project Name is required"),
  scheduledStartDate: yup.date().typeError("Start Date should be of date type").required("Start date is required"),
  owner: yup.string().required("Project Owner is required"),
  client: yup.string().required("Client name is required"),
  address: yup.object({
    address1: yup.string().required("Address line 1 is required"),
    pinCode: yup
      .string()
      .required("Pin Code is required")
      .matches(/^[0-9]+$/, "Pin Code must be only digits")
      .min(6, "Pin Code must be 6 digits")
      .max(6, "Pin Code must be 6 digits"),
    city: yup.string().required("Please wait for the pin code to fetch city and state"),
    state: yup.string().required("Please wait for the pin code to fetch city and state")
  })
});

const CreateForm: React.FC<CreateFormProps> = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) });

  console.log({ errors });

  const onSubmit = (data: any) => {
    console.log(data, errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2}>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Project Name *"
            id="name"
            margin="dense"
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message as string | undefined}
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
                  renderInput={params => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="dense"
                      id="scheduledStartDate"
                      error={Boolean(errors.scheduledStartDate)}
                      helperText={errors.scheduledStartDate?.message as string | undefined}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} md={8}>
          <TextField fullWidth label="Description" id="desc" margin="dense" {...register("desc")} multiline rows={2} />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Project Owner *"
            id="owner"
            margin="dense"
            {...register("owner")}
            error={Boolean(errors.owner)}
            helperText={errors.owner?.message as string | undefined}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Client Name *"
            id="client"
            margin="dense"
            {...register("client")}
            error={Boolean(errors.client)}
            helperText={errors.client?.message as string | undefined}
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
            label="Address Line 1 *"
            id="addressLine1"
            margin="dense"
            {...register("address.address1")}
            error={Boolean((errors.address as undefined | IAddressError)?.address1 as string | undefined)}
            helperText={(errors.address as undefined | IAddressError)?.address1?.message as string | undefined}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField fullWidth label="Address Line 2" id="addressLine2" margin="dense" {...register("address.address2")} />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Pin Code *"
            id="pinCode"
            margin="dense"
            {...register("address.pinCode")}
            error={Boolean((errors.address as undefined | IAddressError)?.pinCode as string | undefined)}
            helperText={(errors.address as undefined | IAddressError)?.pinCode?.message as string | undefined}
            InputProps={{
              endAdornment: <CircularProgress size={20} />
            }}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="City *"
            id="city"
            margin="dense"
            {...register("address.city")}
            error={
              !Boolean((errors.address as undefined | IAddressError)?.pinCode as string | undefined) &&
              Boolean((errors.address as undefined | IAddressError)?.city as string | undefined)
            }
            helperText={
              !Boolean((errors.address as undefined | IAddressError)?.pinCode as string | undefined) &&
              ((errors.address as undefined | IAddressError)?.city?.message as string | undefined)
            }
            disabled
          />
        </Grid>
        <Grid item xs={0} md={4}>
          <TextField fullWidth label="State *" id="state" margin="dense" {...register("address.state")} disabled />
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
