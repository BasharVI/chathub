import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

function GroupChatPage() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const groupResponse = await axios.get(
          `http://localhost:5000/api/group/${groupId}`,
          config
        );
        setGroup(groupResponse.data);
        setIsMember(groupResponse.data.isMember);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
    fetchAllMessages();
  }, []);

  const fetchAllMessages = async (req, res) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const messagesResponse = await axios.get(
        `http://localhost:5000/api/message/${groupId}`,
        config
      );
      setMessages(messagesResponse.data);
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  const handleJoinGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `http://localhost:5000/api/group/${groupId}/join`,
        {},
        config
      );
      enqueueSnackbar("Joined group successfully", { variant: "success" });
      setIsMember(true);
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `http://localhost:5000/api/group/${groupId}/leave`,
        {},
        config
      );
      enqueueSnackbar("Left group successfully", { variant: "success" });
      setIsMember(false);
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const messageData = {
        content: newMessage,
      };

      const response = await axios.post(
        `http://localhost:5000/api/message/${groupId}`,
        messageData,
        config
      );
      if (response) {
        fetchAllMessages();
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Button variant="contained" onClick={() => navigate("/home")}>
          Back to Home
        </Button>
      </Box>
      {group && (
        <Box mt={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            {group.groupName}
            {isMember && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLeaveGroup}
                sx={{ float: "right" }}
              >
                Leave Group
              </Button>
            )}
          </Typography>
          <Typography variant="subtitle1">
            {group.members.length} members
          </Typography>
          <Box
            mt={3}
            mb={3}
            sx={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              height: "400px",
              overflowY: "scroll",
            }}
          >
            <List>
              {messages &&
                messages.map((message) => (
                  <ListItem>
                    <ListItemText
                      primary={message.content}
                      secondary={
                        message.senderId._id !== currentUser.userId
                          ? `Sent by: ${message.senderId.username}`
                          : null
                      }
                      sx={{
                        backgroundColor:
                          message.senderId &&
                          message.senderId._id === currentUser.userId
                            ? "#cce6ff"
                            : "#f0f0f0",
                        borderRadius: "10px",
                        padding: "10px",
                        textAlign:
                          message.senderId &&
                          message.senderId._id === currentUser.userId
                            ? "end"
                            : "left",
                      }}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
          {!isMember ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleJoinGroup}
            >
              Join Group
            </Button>
          ) : (
            <Box display="flex" alignItems="center">
              <TextField
                label="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}

export default GroupChatPage;
