import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Navbar({ isAuthenticated, username, onLogout }) {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ChatHub
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>
              {username}
            </Typography>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : location.pathname === "/login" ? (
          <Button color="inherit" component={Link} to="/">
            Register
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
