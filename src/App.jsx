import "./App.scss";
import Header from "./components/Header/Header";
import InitialSection from "./components/InitialSection/InitialSection";
import Users from "./components/UsersSection/Users";
import { RegisterSection } from "./components/RegisterSection/RegisterSection";
import { useRef } from "react";

export default function App() {
  const usersSection = useRef();
  const regSection = useRef();

  return (
    <>
      <Header usersSection={usersSection} regSection={regSection} />
      <InitialSection regSection={regSection} />
      <Users ref={usersSection} />
      <RegisterSection ref={regSection} />
    </>
  );
}
