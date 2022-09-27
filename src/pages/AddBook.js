import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";

import "./styles.css";

import AddNewPublisher from "./dialouges/AddNewPublisher";
import AddNewAuthor from "./dialouges/AddNewAuthor";
import TagInput from "./tag input/TagInput";

const AddBook = () => {
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
    <div className="add-book">
      <h1>Add a new book</h1>
      <Box component="form" className="add-form">
        <TextField id="book-id" label="Book ID" variant="outlined" />
        <TextField id="book-title" label="Book Title" variant="outlined" />
        <div className="add-dialogue">
          <TextField
            id="publisher-select"
            select
            label="Select"
            value={publisher}
            onChange={handelPublisher}
            helperText="Please add the publisher"
          >
            {publisher_mock.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <button onClick={handleClickOpen} type="button">
            +
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            className="add-dialouge"
            fullWidth={true}
          >
            <AddNewPublisher handleClose={handleClose} />
          </Dialog>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handelDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="add-dialogue">
          <TextField
            id="author-select"
            select
            label="Select"
            value={author}
            onChange={handelAuthor}
            helperText="Please add the author"
          >
            {author_mock.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <button onClick={handleOpenAuthor} type="button">
            +
          </button>
          <Dialog
            open={openAuthor}
            onClose={handleCloseAuthor}
            className="add-dialouge"
            fullWidth={true}
          >
            <AddNewAuthor handleCloseAuthor={handleCloseAuthor} />
          </Dialog>
        </div>
        <div>
          <label>Book PDF</label>
          <input type="file" />
        </div>
        <TagInput />
        <TextField
          id="avilable-units"
          label="Available  Units"
          variant="outlined"
        />
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={price}
            onChange={handelPrice}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Button className="submit" variant="contained">
          Submit Book
        </Button>
      </Box>
    </div>
  );
};

export default AddBook;
