import { Container, Typography, Box, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import successImage from "../../assets/success-image.svg";

export default function SuccessImage() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const imageTimeOut = setTimeout(() => {
      setShowImage(false);
    }, 2000);
    return () => clearTimeout(imageTimeOut);
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
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography variant="h1" fontSize={40} fontFamily={"Nunito"}>
          User successfully registered
        </Typography>
        <Box
          marginTop="50px"
          component="img"
          src={successImage}
          width="328px"
          height="290px"
        ></Box>
      </Container>
    </>
  );
}
