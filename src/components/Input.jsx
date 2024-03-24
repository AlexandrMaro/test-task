import React, { forwardRef } from "react";
import { TextField } from "@mui/material";

export const Input = forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      inputRef={ref}
      {...props}
      sx={{ width: { sx: 328, sm: 380, md: 380, lg: 380 }, height: 54 }}
    />
  );
});
