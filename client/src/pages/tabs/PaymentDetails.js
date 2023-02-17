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
const PaymentDetails = ({
  step,
  setStep,
  unitPrice,
  totalPrice,
  unitReq,
  allUnits,
  buyId,
  bookId,
  buyer,
  setBuyId,
  paymentMethod,
  setPayment,
}) => {
  const author_mock = ["Cash", "Credit Card", "Paypal"];
  const [price, setPrice] = useState();

  const handelAuthor = (event) => {
    setPayment(event.target.value);
  };

  let newUnits = () => {
    console.log(allUnits);
    console.log(unitReq);
    let num = parseInt(allUnits) - parseInt(unitReq);
    return num;
  };

  useEffect(() => {
    axios.get("http://localhost:3001/buyers").then((res) => {
      console.log(res.data[res.data.length - 1].id + 1);
      setBuyId(res.data[res.data.length - 1].id + 1);
    });
  }, [setBuyId]);

  const onSubmit = async () => {
    axios
      .post("http://localhost:3001/buyers", buyer)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const res = await axios
      .put(`http://localhost:3001/books/${bookId}`, { Units: newUnits() })
      .then((res) => console.log(res));
    console.log(res);
    console.log(newUnits());
    axios.post("http://localhost:3001/reserves", {
      PaymentMethod: paymentMethod,
      numberOfUnits: unitReq,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      BookId: bookId,
      BuyerId: buyId,
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
          onChange={(e) => setPrice(e.target.value)}
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
      <div className="buttons-ses">
        <Button variant="contained" onClick={() => setStep(step - 1)}>
          Previous
        </Button>

        <Button className="submit" variant="contained" onClick={onSubmit}>
          Reserve book
        </Button>
      </div>
    </Box>
  );
};

export default PaymentDetails;
