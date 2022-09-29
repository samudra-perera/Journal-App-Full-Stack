import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    userName: "",
    screenName: "",
    email: "",
    password: "",
  });
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:2121/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err.response));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/user"));
  };
  const handleChange = (e) => {
    //Passes in event on handlechange
    setInputs((prev) => ({
      //Prev is the inputs object
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name, "value", e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={300}
          display="flex"
          flexDirection={"column"}
          margin="auto"
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography variant="h2">Login</Typography>
          <TextField
            name="email"
            onChange={handleChange}
            type="email"
            value={inputs.email}
            variant="outlined"
            placeholder="email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};


export default Login;
