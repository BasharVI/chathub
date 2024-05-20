import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

function HomePage() {
  const [publicGroups, setPublicGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const publicGroupsResponse = await axios.get(
          "http://localhost:5000/api/group/",
          config
        );
        // const joinedGroupsResponse = await axios.get(
        //   "/api/group/joined",
        //   config
        // );

        setPublicGroups(publicGroupsResponse.data.allGroups);
        setJoinedGroups(publicGroupsResponse.data.allGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = () => {
    console.log("about to create a group");
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCreateGroup}>
          Create New Group
        </Button>
        <Box mt={3}>
          <Typography variant="h6">Public Groups</Typography>
          <List>
            {publicGroups &&
              publicGroups.map((group) => (
                <ListItem key={group._id}>
                  <ListItemText primary={group.name} />
                </ListItem>
              ))}
          </List>
        </Box>
        <Box mt={3}>
          <Typography variant="h6">Joined Groups</Typography>
          <List>
            {joinedGroups &&
              joinedGroups.map((group) => (
                <ListItem key={group._id}>
                  <ListItemText primary={group.name} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
