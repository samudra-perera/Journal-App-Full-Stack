import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

export const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = () => {};
  const handleChange = (e) => {     //Passes in event on handlechange
    setInputs(prev => ({            //Prev is the inputs object 
        ...prev,
        [e.target.name]: e.target.value
    }))
    console.log(e.target.name, 'value', e.target.value)
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
          <Typography variant="h2">Signup</Typography>
          <TextField
          name="name"
            onChange={handleChange}
            type="name"
            value={inputs.name}
            variant="outlined"
            placeholder="name"
            margin="normal"
          />
          <TextField
          name="username"
            onChange={handleChange}
            type="username"
            value={inputs.username}
            variant="outlined"
            placeholder="username"
            margin="normal"
          />
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
            Sign Up
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
