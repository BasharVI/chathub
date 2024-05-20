import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [publicGroups, setPublicGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

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
          "http://localhost:5000/api/group",
          config
        );

        setPublicGroups(publicGroupsResponse.data.allGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = () => {
    setShowCreateForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const groupData = {
        groupName: groupName,
        description: groupDescription,
      };

      const response = await axios.post(
        "http://localhost:5000/api/group",
        groupData,
        config
      );
      console.log(response);

      setGroupName("");
      setGroupDescription("");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleCancel = () => {
    setGroupName("");
    setGroupDescription("");
    setShowCreateForm(false);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupDescriptionChange = (e) => {
    setGroupDescription(e.target.value);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome
        </Typography>
        {!showCreateForm && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateGroup}
          >
            Create New Group
          </Button>
        )}
        {showCreateForm && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Group Name"
              value={groupName}
              onChange={handleGroupNameChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              value={groupDescription}
              onChange={handleGroupDescriptionChange}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
          </form>
        )}
        <Box mt={3} sx={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
          <Typography variant="h6">Public Groups</Typography>
          <List>
            {publicGroups &&
              publicGroups.map((group) => (
                <ListItem
                  key={group._id}
                  components={Link}
                  to={`/group/${group._id}`}
                >
                  <ListItemText
                    primary={group.groupName}
                    secondary={group.description}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
        <Box mt={3} sx={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
          <Typography variant="h6">Your Groups</Typography>
          <List>
            {publicGroups &&
              publicGroups.map((group) => (
                <ListItem
                  key={group._id}
                  components={Link}
                  to={`/group/${group._id}`}
                >
                  <ListItemText
                    primary={group.groupName}
                    secondary={group.description}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
