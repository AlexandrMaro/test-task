import React from "react";
import { Box } from "@mui/material";
import logo from "../../assets/logo.svg";
import style from "./Header.module.scss";
import CustomButton from "../CustomButton/CustomButton";

function scrollTo(ref) {
  if (!ref.current) return;
  ref.current.scrollIntoView({ behavior: "smooth" });
}

export default function Header({ usersSection, regSection }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Box sx={{ flexGrow: 1 }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 104,
              height: 26,
            }}
          />
        </Box>
        <div className="action">
          <CustomButton onClick={() => scrollTo(usersSection)}>
            Users
          </CustomButton>
          <CustomButton onClick={() => scrollTo(regSection)}>
            Sign Up
          </CustomButton>
        </div>
      </header>
    </div>
  );
}
