import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useParams } from "react-router-dom";
import "../styles.css";

const BookInfro = ({
  step,
  setStep,
  setUnitPrice,
  setTotalPrice,
  setUnitReq,
  setAll,
}) => {
  let { id } = useParams();
  const [book, setBook] = useState({});
  const [publisher, setPublisher] = useState(" ");
  const [date, setDate] = useState(new Date(""));
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState();
  const [listBooks, setListBooks] = useState([]);
  const [avlUnits, setAvlUnits] = useState();
  const [unitsReq, setUnitsReq] = useState();
  React.useEffect(() => {
    async function getResults() {
      const results = await axios.get(`http://localhost:3001/books/${id}`);
      setBook(results.data);
    }
    getResults();
  }, []);
  console.log(book);

  const isUnitsValid = (units) => {
    return units <= 0 || units > parseInt(book.Units);
  };

  const handelDate = (newDate) => {
    setDate(newDate);
  };

  const onSubmit = () => {
    setStep(step + 1);
    setUnitPrice(book.Price);
    setTotalPrice(unitsReq * parseInt(book.Price));
    setBook(book);
    setUnitReq(unitsReq);
    setAll(book.Units);
  };

  return (
    <Box component="form" className="book-details">
      <TextField
        id="publisher-select"
        label="Book ID"
        value={`Book author: ${book.BookId}`}
        disabled={true}
      ></TextField>

      <TextField
        id="publisher-select"
        label="Book Title"
        value={`Book author: ${book.BookTitle}`}
        disabled={true}
      ></TextField>
      <TextField
        id="publisher-select"
        label="Book Publisher"
        value={`Book author: ${book.BookPublisher}`}
        disabled={true}
      ></TextField>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Publish date"
          inputFormat="MM/dd/yyyy"
          value={book.PublishDate}
          disabled={true}
          onChange={handelDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        id="publisher-select"
        value={`Book author: ${book.BookAuthor}`}
        disabled={true}
      ></TextField>

      <TextField
        id="avilable-units"
        variant="outlined"
        value={`Avilable Units: ${book.Units}`}
        disabled={true}
      />
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          disabled={true}
          placeholder="price"
          value={`Book Price: ${book.Price}`}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>
      <TextField
        error={isUnitsValid(unitsReq)}
        id="avilable-units"
        helperText={isUnitsValid(unitsReq) ? "Incorrect number of copies" : ""}
        label="Number of Units"
        variant="outlined"
        autoComplete="off"
        value={unitsReq}
        onChange={(e) => setUnitsReq(e.target.value)}
      />
      <Button className="submit" variant="contained" onClick={() => onSubmit()}>
        Save and continute
      </Button>
    </Box>
  );
};

export default BookInfro;
