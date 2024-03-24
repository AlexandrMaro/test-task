import {
  Container,
  Typography,
  Stack,
  TextField,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Dialog,
} from "@mui/material";
import { Input } from "../Input";
import { Form } from "../RegisterForm/RegisterForm";
import CustomButton from "../CustomButton/CustomButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useState, useEffect, useRef, forwardRef } from "react";
import style from "./RegisterSection.module.scss";
import SuccessImage from "../SuccessRegistration/SuccessImage";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Must be at least 2 characters long")
    .max(60)
    .matches(/^([^0-9]*)$/, "Your name should not contain numbers")
    .required("It's a required field"),
  email: yup
    .string()
    .email("Email should have correct format")
    .min(2, "Must be at least 2 characters long")
    .max(100)
    .required("It's a required field"),
  phone: yup.string().matches().required("It's a required field"),
  avatar: yup
    .mixed()
    .required("This field is required")
    .test("fileSize", "You need to provide a file", (avatar) => {
      return avatar && avatar.size <= 5000000;
    }),
});

export const RegisterSection = forwardRef((props, ref) => {
  const [fileName, setFileName] = useState("Upload your file");
  const fileUpload = useRef();
  const [positions, setPositions] = useState([]);
  const [userPosition, setUserPosition] = useState(0);
  const [tokenState, setTokenState] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [unSuccessError, setUnSuccessError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
    resetField,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const getToken = () => {
    fetch(process.env.REACT_APP_GET_TOKEN)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTokenState(data.token);
        return data.token;
      })
      .catch(function (error) {
        console.log("Token Error:", error);
      });
  };

  const fetchingPositions = async () => {
    setLoading(true);
    const getPositions = await fetch(process.env.REACT_APP_USERS_POSITIONS);

    const data = await getPositions.json();
    setPositions([...positions, ...data.positions]);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("position_id", data.position_id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone.replace(/\s/g, ""));
    formData.append("photo", data.avatar);
    console.log(JSON.stringify(data.phone).replace(/\s/g, ""));

    fetch(process.env.REACT_APP_USERS_URL, {
      method: "POST",
      body: formData,
      headers: {
        Token: tokenState, // get token with GET api/v1/token method
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.success) {
          console.log(data);
          setSuccess(true);
          setOpen(true);
          setUnSuccessError("");
          reset();
          reset({ avatar: [] });
          resetField("position_id");
          setFileName("Upload your file");
        } else {
          // proccess server errors
          console.log(data);
          setUnSuccessError(data.message);
          //console.log("success: ", data.succes, "\nmessage: ", data.message);
        }
      })
      .catch(function (error) {
        // proccess network errors
        setUnSuccessError(error.message);
        console.log("Error response: ", error.message);
      });
  };

  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return value;
    }
    return phoneNumber.formatInternational();
  };

  useEffect(() => {
    fetchingPositions();
    getToken();
  }, []);
  //console.log(unSuccessError);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        ref={ref}
        component="h1"
        variant="h3"
        fontFamily="Nunito"
        lineHeight="40px"
        fontSize="40px"
        align="center"
        display="flex"
        justifyContent="center"
        paddingTop="140px"
      >
        Working with POST request
      </Typography>

      <Form
        display="flex"
        // justifyContent="center"
        // alignItems="center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          spacing="50px"
          marginTop="50px"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Input
            {...register("name")}
            id="name"
            type="text"
            label="Your name"
            name="name"
            error={!!errors?.name}
            helperText={errors?.name?.message}
          />
          <Input
            {...register("email")}
            id="email"
            type="email"
            label="Email"
            name="email"
            error={!!errors.email || !!unSuccessError}
            helperText={errors?.email?.message || unSuccessError}
          />
          <Input
            {...register("phone")}
            id="phone"
            type="tel"
            label="Phone"
            name="phone"
            error={!!errors.phone || !!unSuccessError}
            helperText={errors?.phone?.message || unSuccessError}
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />

          <Dialog onClose={handleClose} open={open}>
            <SuccessImage />
          </Dialog>

          <Box sx={{ justifyContent: "flex-start", display: {} }}>
            <FormControl>
              <Typography
                variant="body1"
                fontFamily="Nunito"
                fontWeight="400"
                fontSize="16px"
                lineHeight="26px"
              >
                Select your position
              </Typography>
              <RadioGroup>
                {positions.map((position) => (
                  <FormControlLabel
                    {...register("position_id", { value: position.id })}
                    key={position.id}
                    value={position.name}
                    control={<Radio value={position.id} />}
                    label={
                      <Typography
                        variant="body1"
                        fontFamily="Nunito"
                        fontWeight="400"
                        fontSize="16px"
                        lineHeight="26px"
                      >
                        {position.name}
                      </Typography>
                    }
                    onChange={() => {
                      setUserPosition(Number(position.id));
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <Button
              component="label"
              variant="outlined"
              sx={{
                width: 83,
                height: 54,
                border: 1,
                borderRadius: "4px 0px 0px 4px",
                color: "#000000DE",
                marginright: "1rem",
                textTransform: "none",
                zIndex: 9999,
                "&:hover": { background: "none" },
              }}
            >
              <Typography variant="body16">Upload</Typography>
              <Controller
                name="avatar"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    accept="image/jpeg"
                    type="file"
                    onChange={(e) => {
                      setFileName(e.target.files[0].name);
                      field.onChange(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                  />
                )}
              />
            </Button>
            <TextField
              variant="standard"
              type="text"
              value={"  " + fileName || "Upload your photo"}
              fullWidth
              inputProps={{ readOnly: true }}
              InputProps={{ disableUnderline: true }}
              sx={{
                width: 297,
                height: 52,
                borderRadius: "0px 4px 4px 0px",
                border: 1,
                color: "#D0CFCF",
                input: {
                  height: "45px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                },
              }}
              error={!!errors.avatar}
              helperText={errors?.avatar?.message}
            />
          </Box>
        </Stack>
        <CustomButton disabled={!isDirty || !isValid} styles={style.signInBtn}>
          Sign In
        </CustomButton>
      </Form>
    </Container>
  );
});
