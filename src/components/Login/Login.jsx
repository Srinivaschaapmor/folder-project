import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Login() {
  return (
    <Box bgcolor={"rgb(238, 242, 246)"} height={"100vh"} pt={15}>
      <Box
        // border={"1px solid"}
        sx={{
          width: 300,
          height: 300,
          margin: "auto",
          bgcolor: "white",
          borderRadius: 4,
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} textAlign={"center"}>
          Login
        </Typography>
        <Button variant="contained" sx={{ mt: 10, ml: 5 }}>
          Login With AuthA
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
