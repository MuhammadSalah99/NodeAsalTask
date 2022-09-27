import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Button from "@mui/material/Button";

import "../styles.css";
const BuyerDetails = () => {
  const publisher_mock = ["دار المعارف", "دار العماد", "دنديس"];
  const author_mock = ["author1", "author2", "author3"];

  const [publisher, setPublisher] = useState("دار المعارف");
  const [date, setDate] = useState(new Date(""));
  const [author, setAuthor] = useState("author1");
  const [price, setPrice] = useState(10);

  const [open, setOpen] = React.useState(false);
  const [openAuthor, setOpenAuthor] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };

  const handelPublisher = (event) => {
    setPublisher(event.target.value);
  };

  const handelDate = (newDate) => {
    setDate(newDate);
  };

  const handelAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handelPrice = (event) => {
    setPrice(10);
  };
  return (
    <Box component="form" className="book-details">
      <TextField id="book-id" label="Buyer name" variant="outlined" />
      <TextField id="book-title" label="Buyer address" variant="outlined" />

      <TextField id="book-title" label="Buyer Phone No." variant="outlined" />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={handelDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <TextField id="avilable-units" label="National ID" variant="outlined" />

      <Button className="submit" variant="contained">
        Save and continute
      </Button>
    </Box>
  );
};

export default BuyerDetails;
