import {
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

import { Link, useLocation, useParams } from "react-router-dom";
import TableData from "./TableData";
import { DataChange, dbStorageMock } from "../dataFolder";
import { CheckBox } from "@mui/icons-material";
function ComponentData({
  Data,
  dbStorage,
  setDbStorage,
  handleDelete,
  handleDownload,
  handleShare,
}) {
  const location = useLocation();
  // console.log(location);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState(0);
  // const [dbStorage, setDbStorage] = useState({});

  const [files, setFiles] = useState([]);

  // const handleDelete = (index, key) => {
  //   // console.log({ index, key });
  //   let tempArray = dbStorage[key];
  //   tempArray.splice(index, 1);
  //   setDbStorage({ ...dbStorage, [key]: tempArray });
  // };

  const { item1, level1, tab1, year, itemOne } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
    // width={"95%"}
    >
      <Stack direction={"row"} sx={{ ml: 3 }} justifyContent={"space-between"}>
        <Stack direction={"row"}>
          {level1 !== "files"
            ? Object.keys(Data[item1][level1]).map((e2, i) => (
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
                    to={
                      Object.values(Data[item1][level1][e2])[0]
                        ? `/${item1}/${level1}/${year}/${e2}/${
                            Object.values(Data[item1][level1][e2])[0]
                          }`
                        : `/${item1}/${level1}/${year}/${e2}/%20.`
                    }
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Tab
                      label={e2}
                      sx={{
                        textDecoration: location.pathname.includes(e2)
                          ? "underline"
                          : "none",
                        textUnderlineOffset: "18px",
                        color: location.pathname.includes(e2)
                          ? "blue"
                          : "black",
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
                  <Link to={`/${item1}/${level1}/${year}/${e}/%20.`}>
                    {" "}
                    <Tab
                      label={e}
                      sx={{
                        textDecoration: location.pathname.includes(e)
                          ? "underline"
                          : "none",
                        textUnderlineOffset: "18px",
                        color: location.pathname.includes(e) ? "blue" : "black",
                      }}
                    ></Tab>
                  </Link>
                </Tabs>
              ))}

          {/* // : Object.keys(DataChange[item1]).map((e) => console.log(e))} */}
        </Stack>
        {/* <Stack direction={"row"} justifyContent={"end"} sx={{ mr: 5 }}>
          <label htmlFor="file-upload">
            <Button
              component="span"
              sx={{
                backgroundColor: "#816eff",
                ":hover": { backgroundColor: "#6758cc" },
                color: "white",
                // width: "10px",
                // fontSize: "10px",
                // borderRadius: 0,
                // padding: 0,
              }}
            >
              <UploadFileOutlinedIcon /> UPLOAD
            </Button>
          </label>
          <input
            type="file"
            multiple
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Stack> */}
      </Stack>

      <Box
        // width={"100%"}
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          m: 2,
          height: "70vh",
          mx: 5,
          display: "flex",
          overflowY: "auto",
          // borderTop: "1px solid rgb(203, 213, 225)",
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
            borderRight: "1px solid #D1D1D1",
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
              {/* {Data[item1][level1][tab1]
                ?  */}
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
                          width: "100%",
                          borderRadius: "5px",
                          color: location.pathname.includes(e3)
                            ? "blue"
                            : "black",
                          backgroundColor: location.pathname.includes(e3)
                            ? "#E1DDFF"
                            : null,
                        }}
                      />
                    </Link>
                  ))
                : null}
            </Tabs>
          </Box>
          {/* <Divider orientation="vertical" /> */}
        </Box>
        {/* Settings */}

        {/* Upload and table */}
        <Box width={"100%"}>
          {/* <Stack spacing={2} sx={{ pb: 5 }}> */}
          {/* {dbStorage.length > 0 ? ( */}
          {Object.keys(dbStorage).length > 0 ? (
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
                {/* Files details in table */}
                {/* {dbStorage.slice(1).map((o, i) => ( */}
                {/* {filteredFiles.map((value, index) => (
                  <TableData
                    key={index}
                    handleDelete={handleDelete}
                    value={value}
                    index={index}
                  />
                ))} */}
                {/* ))} */}

                {Object.keys(dbStorage).includes(location.pathname) ? (
                  <TableData
                    // key={index}
                    handleDelete={handleDelete}
                    value={dbStorage[location.pathname]}
                    parentKey={location.pathname}
                    handleDownload={handleDownload}
                    handleShare={handleShare}
                    // index={index}
                  />
                ) : (
                  <TableData
                    // key={index}
                    handleDelete={handleDelete}
                    value={[]}
                    // index={index}
                    parentKey={location.pathname}
                  />
                )}

                {/* {dbStorage[location.pathname].map((value, index) => (
                  <TableData
                    key={index}
                    // handleDelete={handleDelete}
                    value={value}
                    index={index}
                  />
                ))} */}
              </Table>
            </TableContainer>
          ) : (
            <TableContainer sx={{ mt: 2, width: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>File Name</TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>Upload Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Owned</TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography textAlign={"center"}>
                        No Files Found
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ComponentData;
