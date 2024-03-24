import React from "react";
import { Box } from "@mui/material";
import logo from "../../assets/logo.svg";
import style from "./Header.module.scss";
import CustomButton from "../CustomButton/CustomButton";

function scrollTo(ref) {
  if (!ref.current) return;
  ref.current.scrollIntoView({ behavior: "smooth", top: -100 });
}

export default function Header({ usersSection, regSection }) {
  return (
    <Box className={style.container}>
      <header className={style.header}>
        <Box>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 104,
              height: 26,
            }}
          />
        </Box>
        <Box>
          <CustomButton
            onClick={() => scrollTo(usersSection)}
            styles={style.headerButton}
          >
            Users
          </CustomButton>
          <CustomButton onClick={() => scrollTo(regSection)}>
            Sign up
          </CustomButton>
        </Box>
      </header>
    </Box>
  );
}
