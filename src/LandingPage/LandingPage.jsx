import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Home from "../Home/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
function LandingPage({ Json, selectedTab, setSelectedTab, Data, DataChange }) {
  // console.log(selectedTab);
  // const e3 = Data[]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleAccordionChange = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const location = useLocation();
  return (
    <Stack
      direction={"row"}
      sx={{ backgroundColor: "#FAF9F9", flexBasis: "22%" }}
    >
      <Box
        sx={{
          border: "1px solid white ",
          width: "100%",
          // boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "100%",
          // flexBasis: "60%",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" sx={{ pb: 5, pl: 2 }}>
          <Link
            to={"/"}
            style={{ textDecoration: "none", color: "rgb(103, 88, 204)" }}
          >
            FOLDER
          </Link>
        </Typography>
        <Box maxHeight={380} overflow={"auto"}>
          {Object.keys(Data).map((e, index) => (
            <Box key={index}>
              <Accordion
                elevation={0}
                expanded={expandedIndex === index}
                onChange={() => handleAccordionChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <Typography>{e}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    {Object.keys(Data[e]).map((e1, i) => (
                      <Link
                        key={i}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={
                          Object.values(Data[e][e1])[0].length > 0
                            ? `/${e}/${e1}/2023-2024/${
                                Object.keys(Data[e][e1])[0]
                              }/${
                                Object.entries(
                                  Object.values(Data[e][e1])[0]
                                )[0]?.[1]
                              }`
                            : `/${e}/${e1}/2023-2024/${
                                Object.keys(Data[e][e1])[0]
                              }/ .`
                        }
                      >
                        <Box
                          sx={{
                            py: 1,
                            borderRadius: 2,
                            backgroundColor: location.pathname.includes(e1)
                              ? "#BFB6FF"
                              : null,

                            // width: "90%",
                            ":hover": { backgroundColor: "#E1DDFF" },
                          }}
                        >
                          <Button
                            sx={{
                              color: location.pathname.includes(e1)
                                ? "white"
                                : "black",
                            }}
                          >
                            {e1}
                          </Button>
                        </Box>
                      </Link>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
          {Object.keys(DataChange).map((e, ukey) => (
            <Stack key={ukey}>
              <Link
                to={`/${e}/files/2023-2024/${Object.keys(DataChange[e])[0]}/ .`}
              >
                <Box
                  sx={{
                    color: "black",
                    backgroundColor: location.pathname.includes(e)
                      ? "#BFB6FF"
                      : null,
                    borderRadius: 2,
                    textAlign: "left",

                    px: 1,
                    py: 1,
                  }}
                >
                  <Button
                    sx={{
                      color: location.pathname.includes(e) ? "white" : "black",
                      textTransform: "capitalize",
                      fontSize: 15,
                    }}
                  >
                    {e}
                  </Button>
                </Box>
              </Link>
            </Stack>
          ))}
          <Link to="/shared-files">
            <Box
              sx={{
                color: "black",
                // backgroundColor: "#BFB6FF",
                backgroundColor: location.pathname.includes("shared-files")
                  ? "#BFB6FF"
                  : null,
                borderRadius: 2,
                textAlign: "left",

                px: 1,
                py: 1,
              }}
            >
              {/* <Button
                sx={{
                  color: location.pathname.includes("shared-files")
                    ? "white"
                    : "black",
                  // color: "white",
                  textTransform: "capitalize",
                  fontSize: 15,
                }}
              >
                Shared Files
              </Button> */}
            </Box>
          </Link>
        </Box>
        <Box sx={{ position: "absolute", bottom: 3, mb: 3 }}>
          <Button
            onClick={handleClick}
            sx={{ ":hover": { backgroundColor: "white" } }}
          >
            <Avatar alt="Remy Sharp" sx={{ backgroundColor: "#E1DDFF" }} />
            <Typography sx={{ pl: 2, fontSize: 15, color: "black" }}>
              {" "}
              Test
            </Typography>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Stack>
  );
}
export default LandingPage;
