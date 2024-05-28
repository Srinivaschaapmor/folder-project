import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
function SharedFiles() {
  const columns = [
    {
      field: "employee",
      headerName: "Employee Name",
      width: 250,
    },
    {
      field: "department",
      headerName: "Department",
      width: 250,
    },
    {
      field: "filesCount",
      headerName: "Number Of Files",

      width: 250,
    },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params) => {
        // Check if params.row contains the correct data

        return (
          <Stack direction={"row"} alignItems={"center"}>
            <Button sx={{ textTransform: "capitalize" }}>More Info</Button>
            <ArrowOutwardIcon
              sx={{ fontSize: 14, color: "rgb(38, 126, 212)" }}
            />
          </Stack>
        );
      },

      // width: 250,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <Box sx={{ backgroundColor: "#FAF9F9", pb: "40px", width: "78%" }}>
      <Typography variant="h5" textAlign={"center"} sx={{ mt: 5 }}>
        SHARED FILES
      </Typography>
      <Box sx={{ p: 5 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default SharedFiles;
