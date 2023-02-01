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
import "../styles.css";

const formatResult = (item) => {
  return (
    <div className="result-wrapper">
      <span className="result-span">Book title: {item.BookTitle}</span>
    </div>
  );
};

const BookDetails = () => {
  const [publisher, setPublisher] = useState("دار المعارف");
  const [date, setDate] = useState(new Date(""));
  const [author, setAuthor] = useState("author1");
  const [price, setPrice] = useState(10);
  const [listBooks, setListBooks] = useState([]);
  const [avlUnits, setAvlUnits] = useState();
  const [unitsReq, setUnitsReq] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        setListBooks(res.data);
        console.log(listBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    setPublisher(item.BookPublisher);
    setAvlUnits(item.Units);
    setAuthor(item.BookAuthor);
    setDate(item.PublishDate);
    setPrice(item.Price);
    console.log(item);
  };

  const isUnitsValid = (units) => {
    return units <= 0 || units >= avlUnits;
  };

  const handelDate = (newDate) => {
    setDate(newDate);
  };

  return (
    <Box component="form" className="book-details">
      <ReactSearchAutocomplete
        items={listBooks}
        onSearch={handleOnSearch}
        autoFocus
        formatResult={formatResult}
        placeholder="Search for book with ID"
        resultStringKeyName="BookId"
        fuseOptions={{ keys: ["BookId"] }}
        onSelect={handleOnSelect}
        styling={{
          height: "34px",
          border: "1px solid darkgreen",
          borderRadius: "4px",
          backgroundColor: "white",
          boxShadow: "none",
          hoverBackgroundColor: "lightgreen",
          color: "darkgreen",
          fontSize: "12px",
          fontFamily: "Courier",
          iconColor: "green",
          lineColor: "lightgreen",
          placeholderColor: "darkgreen",
          clearIconMargin: "3px 8px 0 0",
          zIndex: 1000,
        }}
      />
      <ReactSearchAutocomplete
        items={listBooks}
        onSearch={handleOnSearch}
        autoFocus
        placeholder="search for book by title"
        formatResult={formatResult}
        resultStringKeyName="BookTitle"
        onSelect={handleOnSelect}
        fuseOptions={{ keys: ["BookTitle"] }}
        styling={{
          height: "34px",
          border: "1px solid darkgreen",
          borderRadius: "4px",
          backgroundColor: "white",
          boxShadow: "none",
          hoverBackgroundColor: "lightgreen",
          color: "darkgreen",
          fontSize: "12px",
          fontFamily: "Courier",
          iconColor: "green",
          lineColor: "lightgreen",
          placeholderColor: "darkgreen",
          clearIconMargin: "3px 8px 0 0",
          zIndex: 2,
        }}
      />
      <TextField
        id="publisher-select"
        label="Select"
        value={publisher}
        disabled={true}
        helperText="Please add the publisher"
      ></TextField>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Publish date"
          inputFormat="MM/dd/yyyy"
          value={date}
          disabled={true}
          onChange={handelDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        id="author-select"
        label="Select"
        value={author}
        helperText="Please add the author"
        disabled={true}
      ></TextField>

      <TextField
        id="avilable-units"
        variant="outlined"
        value={avlUnits}
        disabled={true}
      />
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          disabled={true}
          placeholder="price"
          value={price}
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
      <Button className="submit" variant="contained">
        Save and continute
      </Button>
    </Box>
  );
};

export default BookDetails;
