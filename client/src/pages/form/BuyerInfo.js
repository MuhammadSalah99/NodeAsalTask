import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import Button from "@mui/material/Button";
const BuyerInfo = ({ step, setStep, setBuyId }) => {
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [date, setDate] = useState(new Date(""));
  const [ID, setID] = useState();

  const handelDate = (newDate) => {
    setDate(newDate);
  };
  const onSubmit = () => {
    axios
      .post("http://localhost:3001/buyers", {
        fullName: fullName,
        address: address,
        phoneNumber: phoneNum,
        purchaseDate: date,
        NationalId: ID,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://localhost:3001/buyers").then((res) => {
      console.log(res.data[res.data.length - 1].id + 1);
      setBuyId(res.data[res.data.length - 1].id + 1);
    });
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

      <Button className="submit" variant="contained" onClick={onSubmit}>
        Save and continute
      </Button>
    </Box>
  );
};

export default BuyerInfo;
