import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import Button from "@mui/material/Button";

import "../styles.css";
const BuyerDetails = ({
  step,
  setStep,
  setBuyId,
  fullName,
  setFullName,
  address,
  setAddress,
  phoneNum,
  setPhoneNum,
  date,
  setDate,
  ID,
  setID,
}) => {
  const handelDate = (newDate) => {
    setDate(newDate);
  };

  const onSubmit = () => {
    setStep(step + 1);
  };

  return (
    <Box component="form" className="book-details">
      <TextField
        id="buyer-name"
        label="Buyer name"
        autoComplete="off"
        placeholder="Buyers Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        variant="outlined"
      />
      <TextField
        id="buyer-address"
        label="Buyer address"
        autoComplete="off"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Buyer address"
      />

      <TextField
        id="buyer-phone"
        value={phoneNum}
        onChange={(e) => setPhoneNum(e.target.value)}
        placeholder="Buyer Phone"
        autoComplete="off"
        label="Buyer Phone No."
        variant="outlined"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Purchase Date"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={handelDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <TextField
        id="avilable-units"
        label="National ID"
        variant="outlined"
        autoComplete="off"
        placeholder="Buyer ID"
        value={ID}
        onChange={(e) => setID(e.target.value)}
      />
      <button className="buttons-ses">
        <Button variant="contained" onClick={() => setStep(step - 1)}>
          Previous
        </Button>

        <Button className="submit" variant="contained" onClick={onSubmit}>
          Save and continute
        </Button>
      </button>
    </Box>
  );
};

export default BuyerDetails;
