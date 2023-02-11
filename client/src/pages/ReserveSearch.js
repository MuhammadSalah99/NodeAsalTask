import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PaymentDetails from "./form/PaymentDetails";
import BookInfro from "./form/BookInfro";
import { useParams } from "react-router-dom";
import axios from "axios";
import BuyerInfo from "./form/BuyerInfo";

const Reserve = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [book, setBook] = React.useState({});
  const [unitReq, setUnitReq] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [unitPrice, setUnitPrice] = React.useState(0);
  let { id } = useParams();

  const [step, setStep] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
        ></BookInfro>
      );
      break;
    case 1:
      formStep = <BuyerInfo step={step} setStep={setStep}></BuyerInfo>;
      break;
    case 2:
      formStep = (
        <PaymentDetails
          step={step}
          setStep={setStep}
          unitReq={unitReq}
          totalPrice={totalPrice}
          unitPrice={unitPrice}
        ></PaymentDetails>
      );
      break;
  }

  return <Box centered>{formStep}</Box>;
};

export default Reserve;
