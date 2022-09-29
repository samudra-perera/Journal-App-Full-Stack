import React, { useState } from "react";
import { AppBar, Tabs, Tab, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
axios.defaults.withCredentials = true


export const Header = () => {
    const dispatch = useDispatch() 
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:2121/login", null, {
        withCredentials: true
    });
    if(res.status === 200) {
        return res
    }
    return new Error('Unable to Log out. Please try again')
  }
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout))
  }
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MernAuth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              <Tab to="/login" LinkComponent={Link} label="Login" />
              <Tab to="/signup" LinkComponent={Link} label="Sign up" />
              {isLoggedIn && <Tab onClick={handleLogout} to="/" LinkComponent={Link} label="Logout" />}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
