import { Box, Button, CircularProgress, Grid, styled, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { Controller, FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IAddress } from "../../../interfaces/commonInterfaces";
import { Check } from "@mui/icons-material";
import { get, post } from "../../../utils/request";

type CreateFormProps = {
  show: boolean; // this prop is used so that form state is not lost if the form is closed by its direct parent
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

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

const CreateForm: React.FC<CreateFormProps> = ({ show, onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    trigger,
    watch,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onTouched" });

  const [isLoading, setIsLoading] = React.useState(false);
  const [pinCodeState, setPinCodeState] = React.useState<undefined | "loading" | "success" | "error">(undefined);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const { message } = await post("/api/projects/v1", data);
      onSuccess(message!);
    } catch (error: any) {
      onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinCodeBlur = async () => {
    const isPinCodeValid = await trigger("address.pinCode");
    if (!isPinCodeValid) {
      return;
    }

    const pinCode = getValues("address.pinCode");
    try {
      setPinCodeState("loading");
      setValue("address.city", "");
      setValue("address.state", "");
      const { data: { city, state } = {} } = await get<{ city: string; state: string; pinCode: string }>(
        "/api/pinCodeToAddress/v1/" + pinCode
      );

      if (!city || !state) {
        throw new Error("Pin Code is invalid");
      }

      setPinCodeState("success");
      setValue("address.city", city);
      setValue("address.state", state);
      trigger("address.city");
      trigger("address.state");
    } catch (error: any) {
      setPinCodeState("error");
      setError("address.pinCode", { type: "manual", message: error.message });
    }
  };

  const PinCodeAdornment = () => {
    switch (pinCodeState) {
      case "loading":
        return <CircularProgress size={20} />;
      case "success":
        return <Check color="success" />;
      case "error":
      default:
        return null;
    }
  };

  return show ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2}>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Project Name *"
            id="name"
            margin="dense"
            disabled={isLoading}
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
                      id="scheduledStartDate"
                      margin="dense"
                      disabled={isLoading}
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
          <TextField fullWidth label="Description" id="desc" margin="dense" disabled={isLoading} {...register("desc")} multiline rows={2} />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Project Owner *"
            id="owner"
            margin="dense"
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
            {...register("address.address1")}
            error={Boolean((errors.address as undefined | IAddressError)?.address1 as string | undefined)}
            helperText={(errors.address as undefined | IAddressError)?.address1?.message as string | undefined}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField fullWidth label="Address Line 2" id="addressLine2" margin="dense" disabled={isLoading} {...register("address.address2")} />
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="Pin Code *"
            id="pinCode"
            margin="dense"
            disabled={isLoading}
            {...register("address.pinCode")}
            error={Boolean((errors.address as undefined | IAddressError)?.pinCode as string | undefined)}
            helperText={(errors.address as undefined | IAddressError)?.pinCode?.message as string | undefined}
            onBlur={handlePinCodeBlur}
            InputProps={{
              endAdornment: <PinCodeAdornment />
            }}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            label="City *"
            id="city"
            margin="dense"
            disabled
            {...register("address.city")}
            error={
              !Boolean((errors.address as undefined | IAddressError)?.pinCode as string | undefined) &&
              Boolean((errors.address as undefined | IAddressError)?.city as string | undefined)
            }
            helperText={
              !Boolean((errors.address as undefined | IAddressError)?.pinCode as string | undefined) &&
              ((errors.address as undefined | IAddressError)?.city?.message as string | undefined)
            }
            InputLabelProps={{ shrink: Boolean(watch("address.city")) }}
          />
        </Grid>
        <Grid item xs={0} md={4}>
          <TextField
            fullWidth
            label="State *"
            id="state"
            margin="dense"
            disabled
            {...register("address.state")}
            InputLabelProps={{ shrink: Boolean(watch("address.state")) }}
          />
        </Grid>
      </Grid>
      <ButtonContainer>
        <Submit
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} sx={{ color: theme => theme.palette.common.white }} /> : null}
        >
          Submit
        </Submit>
      </ButtonContainer>
    </form>
  ) : null;
};
export default CreateForm;
