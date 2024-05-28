import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Link, useLocation, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ComponentData from "../Data/Data";
import { Scrollbar } from "react-scrollbars-custom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home({ Data }) {
  const departments = [
    { name: "HR", members: ["Emp 1", "Emp 2", "Emp 3"] },
    { name: "Testing", members: ["Emp 1", "Emp 2", "Emp 3"] },
    { name: "Full Stack", members: ["Emp 1", "Emp 2", "Emp 3"] },
  ];
  const employees = {
    "Full stack": [
      { id: 1001, name: "Srinivas" },
      { id: 1002, name: "John Doe" },
    ],
    Testing: [
      { id: 2001, name: "Jane Doe" },
      { id: 2002, name: "Richard Roe" },
    ],
    HR: [
      { id: 3001, name: "Alice Smith" },
      { id: 3002, name: "Bob Brown" },
    ],
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const { item1, level1, tab1, year, itemOne } = useParams();
  const pathname = location.pathname;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState(false);
  const [dbStorage, setDbStorage] = useState({});
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);
  const [department, setDepartment] = useState("");
  const [add, setAdd] = useState(false);
  const [checkedEmployees, setCheckedEmployees] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelected(true);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setAdd(true);
  };
  // dbStorage - handle
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    let updatedValue = uploadedFiles.map((file) => ({
      file: file,
      shared: [],
    }));

    if (dbStorage[pathname]) {
      setDbStorage({
        ...dbStorage,
        [pathname]: [...dbStorage[pathname], ...updatedValue],
      });
    } else {
      setDbStorage({
        ...dbStorage,
        [pathname]: updatedValue,
      });
    }
  };
  const handleDownload = (file) => {
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("File Downloaded Successfully");
  };
  const handleDelete = (index, key) => {
    let tempArray = dbStorage[key];
    tempArray.splice(index, 1);
    setDbStorage({ ...dbStorage, [key]: tempArray });
    toast.success("File Deleted Successfully");
  };

  const handleShare = (fileDetails) => {
    setDrawerOpen(true);
    setSelectedFileDetails(fileDetails);
  };

  const [tempDbStorage, setTempDbStorage] = useState(dbStorage);

  const handleCheckboxChange = (
    employeeId,
    employeeName,
    employeeDepartment,
    fileName
  ) => {
    const sharedDate = new Date();

    const updateSharedEmployees = (sharedEmployees) => {
      return [
        ...sharedEmployees,
        { employeeId, employeeName, employeeDepartment, sharedDate },
      ];
    };

    const updatedTempDbStorage = tempDbStorage[pathname].map((item) => {
      if (item.file.name === fileName) {
        return { ...item, shared: updateSharedEmployees(item.shared) };
      }
      return item;
    });

    setCheckedEmployees((prev) => {
      const newCheckedEmployees = prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId];

      // Check if "Select All" should be unchecked
      const isAllChecked =
        newCheckedEmployees.length === employees[department].length;
      setSelectAllChecked(isAllChecked);

      return newCheckedEmployees;
    });

    setTempDbStorage((prev) => {
      return { [pathname]: updatedTempDbStorage };
    });
  };

  const handleSelectAll = (event, fileName) => {
    const isChecked = event.target.checked;
    let selectedEmployeeIds = [...checkedEmployees];
    const currentEmployees =
      employees[department]?.map((employee) => ({
        id: employee.id,
        name: employee.name,
      })) || [];

    let updatedTempDbStorage = [...tempDbStorage[pathname]];

    if (isChecked) {
      currentEmployees.forEach((employee) => {
        if (!selectedEmployeeIds.includes(employee.id)) {
          selectedEmployeeIds.push(employee.id);
          const sharedDate = new Date();
          updatedTempDbStorage = updatedTempDbStorage.map((item) => {
            if (item.file.name === fileName) {
              return {
                ...item,
                shared: [
                  ...item.shared,
                  {
                    employeeId: employee.id,
                    employeeName: employee.name,
                    employeeDepartment: department,
                    sharedDate,
                  },
                ],
              };
            }
            return item;
          });
        }
      });
    } else {
      currentEmployees.forEach((employee) => {
        const index = selectedEmployeeIds.indexOf(employee.id);
        if (index > -1) {
          selectedEmployeeIds.splice(index, 1);
          updatedTempDbStorage = updatedTempDbStorage.map((item) => {
            if (item.file.name === fileName) {
              return {
                ...item,
                shared: item.shared.filter(
                  (sharedEmployee) => sharedEmployee.employeeId !== employee.id
                ),
              };
            }
            return item;
          });
        }
      });
    }

    setCheckedEmployees(selectedEmployeeIds);
    setTempDbStorage({ [pathname]: updatedTempDbStorage });
    setSelectAllChecked(isChecked);
  };

  const handleShareClick = () => {
    setDbStorage(tempDbStorage);
    setCheckedEmployees([]);
    setAdd(false);
    setDrawerOpen(false);
    setDepartment("");
    toast.success("File Shared Successfully");
  };

  useEffect(() => {
    setTempDbStorage(dbStorage);
  }, [dbStorage]);

  useEffect(() => {
    setSelectAllChecked(false);
  }, [department]);
  // console.log(checkedEmployees);
  const handleCancel = () => {
    setAdd(false);
    setDepartment("");
  };
  useEffect(() => {
    // setSelectedFileDetails();
  }, [dbStorage]);

  // console.log(dbStorage);
  return (
    <Box sx={{ backgroundColor: "rgb(238, 242, 246)", width: "85%" }}>
      <Container sx={{ height: "60px", padding: "10px", mb: 2 }}>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Box sx={{ pt: 1, pl: 2 }}>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Typography sx={{ fontSize: 14 }}>{item1}</Typography>
              <Typography sx={{ fontSize: 14 }}>{level1}</Typography>

              <Typography
                color="text.primary"
                fontWeight={600}
                sx={{
                  fontSize: 14,
                  position: "relative",
                  overflow: "hidden",
                  transition: "color 0.5s linear", // Transition for text color
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "currentColor",
                    transform: "translateX(-100%)",
                    transition:
                      "transform 0.1s linear, background-color 0.1s linear", // Transition for underline
                  },
                  "&:hover": {
                    color: "rgb(254, 84, 41)", // Change text color on hover
                  },
                  "&:hover::before": {
                    transform: "translateX(0%)",
                    backgroundColor: "rgb(254, 84, 41)", // Change underline color on hover
                  },
                }}
              >
                {location.pathname.includes("%20.") ? tab1 : itemOne}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            display={"flex"}
            // width={"250px"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            sx={{ height: 40, mr: 1 }}
            gap={2}
          >
            <FormControl>
              <Select
                defaultValue={"2023-2024"}
                renderValue={(selected) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      "&.MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.MuiSvgIcon-root":
                        { fontSize: 16 },
                    }}
                  >
                    <CalendarTodayIcon sx={{ marginRight: 1, width: "14px" }} />
                    {selected}
                  </Box>
                )}
                sx={{
                  borderRadius: 2,
                  fontSize: "14px",
                  minWidth: 150,
                  color: "black",
                  backgroundColor: "white",
                  "& .MuiInputBase-root": {
                    fontSize: "0.8rem",
                    borderRadius: 0,
                    color: "black",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "18px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "8.5px 14px",
                    color: "black",
                  },
                }}
              >
                {["2021-2022", "2022-2023", "2023-2024"].map((year) => (
                  <MenuItem key={year} value={year}>
                    <Link
                      to={`/${item1}/${level1}/${year}/${tab1}/${
                        itemOne || "%20."
                      }`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {year}
                    </Link>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <label htmlFor="file-upload">
              <Button
                component="span"
                sx={{
                  backgroundColor: "rgb(255, 84, 41)",
                  ":hover": { backgroundColor: "rgb(255, 129, 31,0.5 )" },
                  color: "white",
                }}
              >
                <UploadFileOutlinedIcon sx={{ fontSize: 20, mr: 1 }} />
                UPLOAD
              </Button>
            </label>
            <input
              type="file"
              multiple
              id="file-upload"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <IconButton
              onClick={handleClick}
              sx={{ ":hover": { bgcolor: "transparent" } }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg"
                sx={{
                  ":hover": { backgroundColor: "#E1DDFF,0.5" },
                  p: 0,
                }}
              />
            </IconButton>
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
        </Stack>
      </Container>
      <ComponentData
        Data={Data}
        dbStorage={dbStorage}
        setDbStorage={setDbStorage}
        handleDelete={handleDelete}
        handleDownload={handleDownload}
        handleShare={handleShare}
        handleFileChange={handleFileChange}
      />
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          width={500}
          height={"100vh"}
          p={5}
          sx={{ overflow: "hidden", bgcolor: "rgb(244, 243, 245)" }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <ArrowBackOutlinedIcon />
            </IconButton>
            <Typography variant="h6">
              Share "{selectedFileDetails?.file.name}"
            </Typography>
          </Stack>
          <Box sx={{ height: 50, mt: 3, bgcolor: "white", borderRadius: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={2}
            >
              <FormControl sx={{ width: 200 }}>
                <InputLabel
                  id="department-select-label"
                  sx={{ fontSize: 14, mb: 2 }}
                >
                  Select Department
                </InputLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  value={department}
                  label="Select Department"
                  onChange={handleDepartmentChange}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                >
                  <MenuItem value="Full stack">Full stack</MenuItem>
                  <MenuItem value="Testing">Testing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                </Select>
              </FormControl>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ bgcolor: "grey", height: "50px" }}
              />
              <Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={department.length === 0}
                        checked={selectAllChecked}
                        onChange={(e) =>
                          handleSelectAll(e, selectedFileDetails?.file.name)
                        }
                      />
                    }
                    label="Select All"
                  />
                </FormGroup>
              </Box>
            </Stack>
          </Box>
          {add ? (
            <Box mt={2}>
              <TableContainer sx={{ maxHeight: 380 }}>
                <Table sx={{ bgcolor: "white", borderRadius: 3, mt: 3 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Employee Id
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees[department].map((employee) => (
                      <TableRow
                        key={employee.id}
                        sx={{
                          "& .MuiTableCell-root": {
                            padding: 1,
                            pl: 2,
                          },
                        }}
                      >
                        <TableCell>{employee.id}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={() =>
                                    handleCheckboxChange(
                                      employee.id,
                                      employee.name,
                                      department,
                                      selectedFileDetails.file.name
                                    )
                                  }
                                  checked={checkedEmployees.includes(
                                    employee.id
                                  )}
                                />
                              }
                            />
                          </FormGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  onClick={handleShareClick}
                  variant="contained"
                  sx={{ bgcolor: "rgb(103, 88, 204)" }}
                >
                  Share
                </Button>
              </Stack>
            </Box>
          ) : (
            <Scrollbar>
              <Typography
                variant="h6"
                fontWeight={700}
                textAlign={"center"}
                mt={3}
              >
                Shared File Access
              </Typography>
              <TableContainer sx={{ maxHeight: 380 }}>
                <Table
                  sx={{
                    bgcolor: "white",
                    borderRadius: 3,
                    mt: 3,
                    mb: 2,
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Shared Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedFileDetails?.shared.length > 0 ? (
                      selectedFileDetails?.shared.map((share, index) => (
                        <TableRow key={index}>
                          <TableCell>{share.employeeName}</TableCell>
                          <TableCell>{share.employeeDepartment}</TableCell>
                          <TableCell>
                            {new Date(share.sharedDate).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                          File Not Shared
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          )}
        </Box>
      </Drawer>
      <ToastContainer />
    </Box>
  );
}

export default Home;
