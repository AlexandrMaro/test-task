import "./App.scss";
import Header from "./components/Header/Header";
import InitialSection from "./components/InitialSection/InitialSection";
import Users from "./components/UsersSection/Users";
import { RegisterSection } from "./components/RegisterSection/RegisterSection";
import { useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 768,
      lg: 1024,
      xl: 2560,
    },
  },
  typography: {
    fontFamily: "Nunito",
  },
});

export default function App() {
  const usersSection = useRef();
  const regSection = useRef();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header usersSection={usersSection} regSection={regSection} />
        <InitialSection regSection={regSection} />
        <Users ref={usersSection} />
        <RegisterSection ref={regSection} />
      </ThemeProvider>
    </>
  );
}
