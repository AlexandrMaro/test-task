import CustomButton from "../CustomButton/CustomButton";
import { Button, Fade, Input, Typography } from "@mui/material";
//import styles from "../Registration/Registration.module.scss";
import { Container, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { Radio } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useRef } from "react";

import InputMask from "react-input-mask";
import SuccessImage from "../SuccessRegistration/SuccessImage";

//import SuccessImage from "../SuccessRegistration/SuccessImage";

//let token = "";

export default function Registration() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  const [filename, setFilename] = useState("Upload your photo");
  const [tokenState, setTokenState] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPosition, setUserPosition] = useState(0);
  const photoRef = useRef();
  const [checkPhoto, setcheckPhoto] = useState();
  const formRef = useRef();
  const [success, setSuccess] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validName, setValidName] = useState(false);
  const [helperTextName, setHelperTextName] = useState(null);
  const [helperTextEmail, setHelperTextEmail] = useState(null);

  //console.log(filename);

  const getToken = () => {
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        setTokenState(data.token);
        return data.token;
      })
      .catch(function (error) {
        console.log("Token Error:", error);
      });
  };

  const validationForm = (e) => {
    getToken();
    const userPhoto = photoRef.current.files[0];
    //console.log(userPhoto);
    const formData = new FormData(); // file from input type='file'
    formData.append("position_id", userPosition);
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("phone", userPhone);
    formData.append("photo", userPhoto);

    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
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
          console.log(success);
        } else {
          // proccess server errors
          console.log("success: ", data.success, "\nmessage: ", data.message);
        }
      })
      .catch(function (error) {
        // proccess network errors
        console.log("Error response: ", error);
      });
    //e.preventDefault();
    //e.target.reset();
  };

  const fetchingPositions = async () => {
    setLoading(true);
    const getPositions = await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
    );

    const data = await getPositions.json();
    setPositions([...positions, ...data.positions]);
  };

  const validateName = (name) => {
    let regexName = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u;
    if ((regexName.test(name) && name.length >= 2) || !name) {
      setValidName(false);
      setHelperTextName("");
    } else {
      setValidName(true);
      setHelperTextName("Incorrect entry");
    }
  };

  const validateEmail = (email) => {
    let regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(email) || !email) {
      setValidEmail(false);
      setHelperTextEmail("");
    } else {
      setValidEmail(true);
      setHelperTextEmail("Incorrect entry");
    }
  };

  const validatePhone = (phone) => {
    let regexPhone = /^[\+]{ 0, 1}380([0 - 9]{ 9})$/;
    if (regexPhone.test(phone) || !phone) {
    }
  };

  useEffect(() => {
    fetchingPositions();
    setFilename(photoRef.current?.files[0]?.name);
    getToken();
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box display="flex" justifyContent="center" paddingTop="140px">
          <h1>Working with POST request</h1>
        </Box>
        {success && (
          <Box
            setIsShowing={setIsShowing}
            zIndex={9999}
            position="absolute"
            sx={{
              backdropFilter: "blur(5px)",
              boxShadow: "1px 1px 2px 2px",
              borderRadius: "10px",
              //other styles here
            }}
          >
            <Fade in={setIsShowing}>
              <SuccessImage setIsShowing={setIsShowing} />
            </Fade>
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          component="form"
        >
          <Stack spacing="50px" marginTop="50px">
            <TextField
              label="Your name"
              //helperText={firstName}
              sx={{ width: 380, height: 54 }}
              type="text"
              required
              error={validName}
              helperText={helperTextName}
              inputProps={{ minLength: 2, maxLength: 100 }}
              onInput={(event) => {
                validateName(event.target.value);
              }}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <TextField
              label="Email"
              type="email"
              sx={{ width: 380, height: 54 }}
              inputProps={{
                pattern:
                  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
              }}
              required
              onInput={(event) => {
                validateEmail(event.target.value);
              }}
              onChange={(event) => {
                setUserEmail(event.target.value);
              }}
              error={validEmail}
              helperText={helperTextEmail}
            />
            <TextField
              label="Phone"
              type="text"
              helperText="+38 (0XX) XXX - XX - XX"
              sx={{ width: 380, height: 54 }}
              inputProps={{
                pattern: "(s*)?(+)?([- _():=+]?d[- _():=+]?){10,14}(s*)?",
                //format: "+38(0##) ###-##-##",
              }}
              required
              onChange={(event) => {
                setUserPhone(event.target.value);
                //formatPhoneNumber(event.target.value);
              }}
              onInput={(event) => {
                //console.log(phoneMask(event.target.value));
                //event.target.value = formatPhoneNumber(event.target.value);
              }}
            />
            <FormControl>
              <Typography variant="body16">Select your position</Typography>
              <RadioGroup>
                {positions.map((position) => (
                  <FormControlLabel
                    key={position.id}
                    value={position.name}
                    control={<Radio />}
                    label={
                      <Typography variant="body16">{position.name}</Typography>
                    }
                    onChange={() => {
                      setUserPosition(Number(position.id));
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
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
                <input
                  type="file"
                  accept=".jpg"
                  hidden
                  ref={photoRef}
                  onChange={() => {
                    setFilename(photoRef.current?.files[0]?.name);
                  }}
                />
              </Button>
              <TextField
                //hiddenLabel
                variant="standard"
                type="text"
                //defaultValue={"Upload your photo"}
                value={filename || "Upload your photo"}
                //disabled
                fullWidth
                inputProps={{ readOnly: true }}
                InputProps={{ disableUnderline: true }}
                sx={{
                  left: -1,
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
              />
            </Box>
          </Stack>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          marginTop="50px"
          marginBottom="100px"
        >
          <CustomButton className="disabled" onClick={validationForm}>
            Sign Up
          </CustomButton>
        </Box>
      </Container>
    </>
  );
}
