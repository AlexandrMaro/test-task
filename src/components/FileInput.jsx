import { forwardRef, useRef } from "react";
import { Button, Typography, TextField, Box } from "@mui/material";
import React, { useState } from "react";

export const FileInput = forwardRef((props, ref) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    ref = event.target.files[0];
    const file = event.target.files[0];
    setFileName(file ? file.name : "");
    console.log(file);
  };

  return (
    <>
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
        <Typography variant="body16" fontSize="16px">
          Upload
        </Typography>
        <input
          {...props}
          type="file"
          accept=".jpg"
          hidden
          inputRef={ref}
          onChange={handleFileChange}
        />
      </Button>
      <TextField
        variant="standard"
        type="text"
        value={"  " + fileName || "   Upload your photo"}
        fullWidth
        inputProps={{ readOnly: true }}
        InputProps={{ disableUnderline: true }}
        sx={{
          fontSize: "16px",
          width: { sm: "328px", md: "380px", lg: "380px", xl: "380px" },
          height: 52,
          borderRadius: "0px 4px 4px 0px",
          border: 1,
          color: "#7E7E7E",
          input: {
            height: "45px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
      />
    </>
  );
});
