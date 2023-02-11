import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookDetails from "./tabs/BookDetails";
import BuyerDetails from "./tabs/BuyerDetails";
import PaymentDetails from "./tabs/PaymentDetails";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Reserve = () => {
  const [book, setBook] = React.useState({});
  const [unitReq, setUnitReq] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [unitPrice, setUnitPrice] = React.useState(0);
  const [allUnits, setAll] = React.useState(0);
  const [buyId, setBuyId] = React.useState(0);
  const [bookId, setBookId] = React.useState(1);
  const [step, setStep] = React.useState(0);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
        <BookDetails
          step={step}
          setStep={setStep}
          setBook={setBook}
          setUnitPrice={setUnitPrice}
          setTotalPrice={setTotalPrice}
          setUnitReq={setUnitReq}
          setAll={setAll}
          setBookId={setBookId}
        ></BookDetails>
      );
      break;
    case 1:
      formStep = (
        <BuyerDetails
          step={step}
          setStep={setStep}
          setBuyId={setBuyId}
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
          bookId={bookId}
        ></PaymentDetails>
      );
      break;
  }

  return <Box centered>{formStep}</Box>;
};

export default Reserve;
