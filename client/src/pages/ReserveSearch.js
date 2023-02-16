import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PaymentDetails from "./tabs/PaymentDetails";
import BookInfro from "./form/BookInfro";
import { useParams } from "react-router-dom";
import axios from "axios";
import BuyerDetails from "./tabs/BuyerDetails";

const ReserveSearch = () => {
  let { id } = useParams();

  const [value, setValue] = useState(0);
  const [book, setBook] = useState({});
  const [unitReq, setUnitReq] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [allUnits, setAll] = useState(0);
  const [buyId, setBuyId] = useState(0);

  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [date, setDate] = useState(new Date(""));
  const [ID, setID] = useState();

  const [paymentMethod, setPayment] = useState();

  const [step, setStep] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let buyer = {
    fullName: fullName,
    address: address,
    phoneNumber: phoneNum,
    purchaseDate: date,
    NationalId: ID,
  };

  let formStep;

  switch (step) {
    case 0:
      formStep = (
        <BookInfro
          step={step}
          setStep={setStep}
          setBook={setBook}
          setUnitPrice={setUnitPrice}
          setTotalPrice={setTotalPrice}
          setUnitReq={setUnitReq}
          setAll={setAll}
          unitReq={unitReq}
        ></BookInfro>
      );
      break;
    case 1:
      formStep = (
        <BuyerDetails
          step={step}
          setStep={setStep}
          setBuyId={setBuyId}
          fullName={fullName}
          setFullName={setFullName}
          address={address}
          setAddress={setAddress}
          phoneNum={phoneNum}
          setPhoneNum={setPhoneNum}
          date={date}
          setDate={setDate}
          ID={ID}
          setID={setID}
        ></BuyerDetails>
      );
      break;
    case 2:
      formStep = (
        <PaymentDetails
          step={step}
          setStep={setStep}
          unitReq={unitReq}
          totalPrice={totalPrice}
          unitPrice={unitPrice}
          allUnits={allUnits}
          buyId={buyId}
          bookId={id}
          buyer={buyer}
          setBuyId={setBuyId}
          paymentMethod={paymentMethod}
          setPayment={setPayment}
        ></PaymentDetails>
      );
      break;
  }

  return <Box centered>{formStep}</Box>;
};

export default ReserveSearch;
