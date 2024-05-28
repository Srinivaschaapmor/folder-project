import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { Link, useLocation, useParams } from "react-router-dom";
import TableData from "./TableData";
import { DataChange, dbStorageMock } from "../../dataFolder";
import { CheckBox } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";
import UploadFile from "./UploadFile";
function ComponentData({
  Data,
  dbStorage,
  setDbStorage,
  handleDelete,
  handleDownload,
  handleShare,
  handleFileChange,
}) {
  const location = useLocation();
  const isSelected = (path) => location.pathname.includes(path);

  const [value, setValue] = useState(0);

  const { item1, level1, tab1, year, itemOne } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const iconItems = {
    PLANNING: <AssignmentIcon sx={{ fontSize: 18 }} />,

    DESIGNING: <DesignServicesIcon sx={{ fontSize: 18 }} />,
    DEVELOPING: <CodeIcon sx={{ fontSize: 18 }} />,
  };
  return (
    <Box bgcolor={"white"} mx={5} borderRadius={3}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        // mb={2}
        // bgcolor={"white"}
      >
        <Stack direction="row">
          {level1 !== "files"
            ? Object.keys(Data[item1][level1]).map((e2, i) => (
                <Tabs
                  key={i}
                  value={value}
                  onChange={handleChange}
                  TabIndicatorProps={{ style: { display: "none" } }}
                >
                  <Link
                    to={
                      Object.values(Data[item1][level1][e2])[0]
                        ? `/${item1}/${level1}/${year}/${e2}/${
                            Object.values(Data[item1][level1][e2])[0]
                          }`
                        : `/${item1}/${level1}/${year}/${e2}/%20.`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Tab
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {iconItems[e2.toUpperCase()] && (
                            <Box sx={{ mr: 1 }}>
                              {iconItems[e2.toUpperCase()]}
                            </Box>
                          )}
                          {e2}
                        </Box>
                      }
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        textDecoration: isSelected(e2) ? "underline" : "none",
                        textUnderlineOffset: "18px",
                        fontWeight: isSelected(e2) ? "700" : "normal",
                        color: isSelected(e2) ? "rgb(254, 84, 41)" : "black",
                        transition: "color 0.1s linear",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          width: "100%",
                          height: "2px",
                          bottom: 0,
                          left: 0,
                          backgroundColor: "currentColor",
                          transform: isSelected(e2)
                            ? "translateX(0%)"
                            : "translateX(-100%)",
                          transition:
                            "transform 0.1s linear, background-color 0.1s linear",
                        },
                        "&:hover": !isSelected(e2) && {
                          color: "rgb(254, 84, 41)",
                        },
                        // "&:hover::before": !isSelected(e2) && {
                        //   transform: "translateX(0%)",
                        //   backgroundColor: "rgb(254, 84, 41)",
                        // },
                      }}
                    />
                  </Link>
                </Tabs>
              ))
            : Object.keys(DataChange[item1]).map((e, i) => (
                <Tabs
                  key={i}
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  TabIndicatorProps={{ style: { display: "none" } }}
                  aria-label="scrollable auto tabs example"
                >
                  <Link
                    to={`/${item1}/${level1}/${year}/${e}/%20.`}
                    style={{ textDecoration: "none" }}
                  >
                    <Tab
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {iconItems[e.toUpperCase()] && (
                            <Box sx={{ mr: 1 }}>
                              {iconItems[e.toUpperCase()]}
                            </Box>
                          )}
                          {e}
                        </Box>
                      }
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        textDecoration: isSelected(e) ? "underline" : "none",
                        textUnderlineOffset: "18px",
                        fontWeight: isSelected(e) ? "700" : "normal",
                        color: isSelected(e) ? "rgb(255, 108, 71)" : "black",
                        transition: "color 0.1s linear",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          width: "100%",
                          height: "2px",
                          bottom: 0,
                          left: 0,
                          backgroundColor: "currentColor",
                          transform: isSelected(e)
                            ? "translateX(0%)"
                            : "translateX(-100%)",
                          transition:
                            "transform 0.1s linear, background-color 0.1s linear",
                        },
                        "&:hover": !isSelected(e) && {
                          color: "rgb(254, 84, 41)",
                        },
                        // "&:hover::before": !isSelected(e) && {
                        //   transform: "translateX(0%)",
                        //   backgroundColor: "rgb(254, 84, 41)",
                        // },
                      }}
                    />
                  </Link>
                </Tabs>
              ))}
        </Stack>
      </Stack>

      <Box
        // width={"100%"}
        sx={{
          // bgcolor: "white",
          // borderRadius: 3,
          // m: 2,
          minHeight: "75vh",
          // mx: 5,
          display: "flex",
          overflowY: "auto",
          borderTop: "1px solid rgb(203, 213, 225)",
        }}
      >
        {/* Menu items in Box */}
        <Box
          sx={{
            position: "sticky",
            zIndex: 0,
            top: "0px",
            // display: "flex",
            flexBasis: location.pathname.includes("%20.") ? null : "20%",
            borderRight: level1 != "files" ? "1px solid #D1D1D1" : 0,
            pt: 3,
          }}
        >
          <Box sx={{}}>
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              sx={{
                "& .MuiTabs-indicator": { display: "none" },
                color: "black",
              }}
              // scrollButtons={false}
              // aria-label="scrollable prevent tabs example"
            >
              {level1 !== "files"
                ? Data[item1][level1][tab1].map((e3, i) => (
                    <Link
                      key={i}
                      to={`/${item1}/${level1}/${year}/${tab1}/${
                        e3 ? e3 : null
                      }`}
                      style={{ textDecoration: "none", color: "inherit" }} // Apply styles to remove default link styling
                    >
                      <Tab
                        label={e3}
                        sx={{
                          width: "90%",
                          ml: 1,
                          borderRadius: "5px",
                          "&.MuiButtonBase-root.MuiTab-root": {
                            "-webkit-align-items": "flex-start",
                            // alignItems: "left",
                            // "::webkit-align-items": "left",
                          },
                          fontWeight: location.pathname.includes(e3) && "700",
                          color: location.pathname.includes(e3)
                            ? "rgb(0, 0, 0)"
                            : "grey",
                          ":hover": {
                            bgcolor: "rgba(154, 173, 186, 0.2)",
                            color: "black",
                          },
                          backgroundColor: location.pathname.includes(e3)
                            ? "rgb(235, 235, 235)"
                            : null,
                        }}
                      />
                    </Link>
                  ))
                : null}
            </Tabs>
          </Box>
        </Box>

        {/* Upload and table */}
        <Box width={"100%"}>
          {Object.keys(dbStorage).length > 0 && (
            <TableContainer sx={{ width: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>File Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Upload Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Owned</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                {Object.keys(dbStorage).includes(location.pathname) &&
                dbStorage[location.pathname]?.length > 0 ? (
                  <TableData
                    handleDelete={handleDelete}
                    value={dbStorage[location.pathname]}
                    parentKey={location.pathname}
                    handleDownload={handleDownload}
                    handleShare={handleShare}
                    handleFileChange={handleFileChange}
                  />
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        align="center"
                        sx={{ borderBottom: 0 }}
                      >
                        <UploadFile />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          )}
          {Object.keys(dbStorage).length === 0 && (
            <>
              <TableContainer sx={{ width: "100%" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>File Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Upload Date
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Owned</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
              <Box>
                <UploadFile handleFileChange={handleFileChange} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ComponentData;
