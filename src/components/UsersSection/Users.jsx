import Grid from "@mui/material/Unstable_Grid2/Grid2";
import UserCard from "../Cards/UserCard";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import CustomButton from "../CustomButton/CustomButton";
import CircularProgress from "@mui/material/CircularProgress";
import s from "./Users.module.scss";

const Users = forwardRef((props, ref) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nextLink, setNextLink] = useState("");
  const [disabled, setDisabled] = useState(false);
  let totalPages;

  const fetchingUsers = async () => {
    setLoading(true);
    const getUsers = await fetch(process.env.REACT_APP_FETCHING_USERS);

    const data = await getUsers.json();

    data.users.sort(function (date1, date2) {
      return date2.registration_timestamp - date1.registration_timestamp;
    });

    totalPages = data.total_pages;

    setUsers(data.users);
    setNextLink(data.links.next_url);
    setLoading(false);
  };
  let currentPage = 0;

  const moreUsers = async () => {
    setIsLoading(true);
    const getUsers = await fetch(nextLink);
    const data = await getUsers.json();

    if (!data.links.next_url) {
      setDisabled(true);
    }
    currentPage = data.page;
    setUsers([...users, ...data.users]);
    setNextLink(data.links.next_url);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchingUsers();
  }, []);

  return (
    <>
      <Container className={s.container}>
        <Typography
          ref={ref}
          component="h1"
          variant="h3"
          lineHeight="40px"
          fontSize="40px"
          align="center"
          display="flex"
          justifyContent="center"
          paddingTop="140px"
        >
          Working with GET request
        </Typography>
        <Grid
          container
          paddingTop="50px"
          paddingBottom="50px"
          display="flex"
          justifyContent="center"
          justifyItems="center"
          alignContent="center"
          className={s.gridUsers}
        >
          {loading && <CircularProgress />}
          {users.map((user) => (
            <Grid
              key={user.id}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: {
                  xl: "calc(100%/3 - 43px)",
                  lg: "calc(100%/3 - 43px)",
                  md: "calc(100%/3 - 20px)",
                  sm: "calc(100%/2 - 8px)",
                  xs: "100%",
                },
              }}
            >
              <UserCard
                key={user.id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                position={user.position}
                photo={user.photo}
              />
            </Grid>
          ))}
        </Grid>
        <Box display={disabled ? "none" : "flex"} justifyContent="center">
          <CustomButton onClick={moreUsers}>
            {!isLoading ? (
              "Show more"
            ) : (
              <CircularProgress
                size={25}
                sx={{
                  marginTop: "5px",
                }}
              />
            )}
          </CustomButton>
        </Box>
      </Container>
    </>
  );
});
export default Users;
