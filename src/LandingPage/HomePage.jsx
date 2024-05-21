import { Stack, Typography } from "@mui/material";
import React from "react";

function HomePage() {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ width: "100%", backgroundColor: "#FAF9F9" }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Dashboard
      </Typography>
    </Stack>
  );
}

export default HomePage;
