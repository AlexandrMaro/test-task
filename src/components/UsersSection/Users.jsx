import Grid from "@mui/material/Unstable_Grid2/Grid2";
import UserCard from "../Cards/UserCard";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import CustomButton from "../CustomButton/CustomButton";
import CircularProgress from "@mui/material/CircularProgress";

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

    currentPage = data.page;
    //console.log(currentPage);
    setUsers([...users, ...data.users]);
    setNextLink(data.links.next_url);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchingUsers();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" paddingTop="140px">
          <h1 ref={ref}>Working with GET request</h1>
        </Box>
        <Grid
          container
          spacing="20px"
          paddingTop="50px"
          paddingBottom="50px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {loading && <CircularProgress />}
          {users.map((user) => (
            <Grid
              key={user.id}
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
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
        <Box display="flex" justifyContent="center">
          <CustomButton onClick={moreUsers} isLoading={isLoading}>
            {!isLoading ? (
              "Show More"
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
