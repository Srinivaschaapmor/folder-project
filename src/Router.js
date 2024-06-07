import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import { Stack } from "@mui/material";
import HomePage from "./components/LandingPage/HomePage";
import { Data, DataChange } from "./dataFolder";
import SharedFiles from "./components/SharedFiles/SharedFiles";
import Login from "./components/Login/Login";

const AppRouter = () => {
  //State managing for seleted tab
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <BrowserRouter>
      <MainRouter selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </BrowserRouter>
  );
};

const MainRouter = ({ selectedTab, setSelectedTab }) => {
  const location = useLocation();

  if (location.pathname.includes("login")) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Stack direction={"row"} sx={{ minHeight: "100vh" }}>
      {/* side bar */}
      <LandingPage
        Data={Data}
        DataChange={DataChange}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/:item1/:level1/:year/:tab1/:itemOne"
          element={
            // All components belong to file upload
            <Home
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              Data={Data}
            />
          }
        />
        {/* <Route path="/shared-files" element={<SharedFiles />} /> */}
        <Route path="*" element={<p>Invalid Path</p>} />
      </Routes>
    </Stack>
  );
};

export default AppRouter;
