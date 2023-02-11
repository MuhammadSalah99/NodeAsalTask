import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import axios from "axios";
import "../styles.css";
import { useParams } from "react-router-dom";

const PaymentDetails = ({ step, setStep, unitPrice, totalPrice, unitReq }) => {
  let { id } = useParams();

  const author_mock = ["Cash", "Credit Card", "Paypal"];
  const [paymentMethod, setPayment] = useState();
  const [numberUnits, setNumberUnits] = useState();
  const [price, setPrice] = useState();

  const handelAuthor = (event) => {
    setPayment(event.target.value);
  };

  const onSubmit = () => {
    axios.post("http://localhost:3001/reserves", {
      PaymentMethod: paymentMethod,
      numberOfUnits: unitReq,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      BookId: id,
    });
  };

  return (
    <Box component="form" className="book-details">
      <TextField
        id="author-select"
        select
        label="Payment method"
        value={paymentMethod}
        autoComplete="off"
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
        autoComplete="off"
        variant="outlined"
        value={unitReq}
        disabled={true}
      />
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={unitPrice}
          placeholder="Price"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
          disabled={true}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          autoComplete="off"
          value={totalPrice}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Total Amount"
          disabled={true}
        />
      </FormControl>

      <Button className="submit" variant="contained" onClick={onSubmit}>
        Reserve book
      </Button>
    </Box>
  );
};

export default PaymentDetails;
