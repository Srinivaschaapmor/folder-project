import {
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import share from "../assets/share.png";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
function TableData({
  handleDelete,
  value,
  index,
  parentKey,
  handleDownload,
  handleShare,
}) {
  console.log({ value });
  const getFileIcon = (type) => {
    // console.log(type);
    switch (type) {
      case "pdf":
        return <PictureAsPdfOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "png":
        return <ImageOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "jpg":
        return <ImageOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "doc":
        return <DescriptionOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "xls":
        return <TableChartOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "csv":
        return <TableChartOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "ics":
        return <EventNoteOutlinedIcon sx={{ fontSize: "20px" }} />;
      default:
        return <InsertDriveFileOutlinedIcon sx={{ fontSize: "20px" }} />;
    }
  };

  return (
    <TableBody key={index}>
      {value.length > 0 ? (
        value.map((file, fileIndex) => (
          <TableRow>
            <TableCell sx={{ p: 1, color: "#393939" }}>
              <Stack direction={"row"} alignItems={"center"} sx={{ pl: 2 }}>
                {getFileIcon(file.file.name.split(".").slice(-1)[0])}
                <Typography sx={{ pl: 2 }}>{file.file.name}</Typography>
                {/* <Typography sx={{ width: 270 }}>
              {value.FilesInfo.map((e) => e.name)}
            </Typography> */}
              </Stack>
            </TableCell>

            {/* <TableCell sx={{ p: 1 }}>{value.timestamp}</TableCell> */}
            <TableCell>{new Date().toString().slice(4, 21)}</TableCell>
            <TableCell>Srinivas</TableCell>
            <TableCell sx={{ p: 1 }}>
              <Stack direction={"row"} gap={2}>
                <DownloadOutlinedIcon
                  sx={{
                    fontSize: "20px",

                    cursor: "pointer",
                  }}
                  onClick={() => handleDownload(file.file)}
                />
                <ShareOutlinedIcon
                  sx={{
                    fontSize: "20px",

                    cursor: "pointer",
                  }}
                  onClick={() => handleShare(file)}
                />
                <DeleteOutlineOutlinedIcon
                  sx={{
                    fontSize: "20px",

                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(fileIndex, parentKey)}
                />
              </Stack>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableCell colSpan={6} sx={{ textAlign: "center" }}>
          No Files Found
        </TableCell>
      )}
    </TableBody>
  );
}

export default TableData;
