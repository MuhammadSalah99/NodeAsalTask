import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import "../styles.css";
const PaymentDetails = () => {
  const publisher_mock = ["دار المعارف", "دار العماد", "دنديس"];
  const author_mock = ["Cash", "Credit Card", "Paypal"];

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
      <TextField
        id="author-select"
        select
        label="Payment method"
        value={author}
        onChange={handelAuthor}
        helperText="Please choose payment method"
      >
        {author_mock.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="avilable-units"
        label="Number of Units"
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
        Reserve book
      </Button>
    </Box>
  );
};

export default PaymentDetails;
