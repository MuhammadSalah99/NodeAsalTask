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

const formatResult = (item) => {
  return (
    <div className="result-wrapper">
      <span className="result-span">Book title: {item.BookTitle}</span>
    </div>
  );
};

const BookDetails = ({
  step,
  setStep,
  setBook,
  book,
  setUnitPrice,
  setTotalPrice,
  unitReq,
  setUnitReq,
  setAll,
  setBookId,
}) => {
  let { id } = useParams();

  const [publisher, setPublisher] = useState(" ");
  const [date, setDate] = useState(new Date(""));
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState();
  const [listBooks, setListBooks] = useState([]);
  const [avlUnits, setAvlUnits] = useState();
  useEffect(() => {
    async function getResults() {
      const results = await axios.get(`http://localhost:3001/books`);
      setListBooks(results.data.books);
    }
    getResults();
  }, []);
  console.log(listBooks);
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    setPublisher(item.BookPublisher);
    setAvlUnits(item.Units);
    setAuthor(item.BookAuthor);
    setDate(item.PublishDate);
    setPrice(item.Price);
    setBook(item);
    console.log(item);
  };

  const isUnitsValid = (units) => {
    return units <= 0 || units > avlUnits;
  };

  const handelDate = (newDate) => {
    setDate(newDate);
  };

  const onSubmit = () => {
    setStep(step + 1);
    setUnitPrice(book.Price);
    setTotalPrice(unitReq * parseInt(book.Price));
    setBook(book);
    setUnitReq(unitReq);
    setAll(book.Units);
    setBookId(book.id);
  };

  return (
    <Box component="form" className="book-details">
      <label>Search for book id</label>
      <ReactSearchAutocomplete
        items={listBooks}
        label="Search for book ID"
        onSearch={handleOnSearch}
        autoFocus
        formatResult={formatResult}
        placeholder={book.BookId}
        resultStringKeyName="BookId"
        fuseOptions={{ keys: ["BookId"] }}
        value={book.BookId}
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
      <label>Search for book title:</label>
      <ReactSearchAutocomplete
        items={listBooks}
        onSearch={handleOnSearch}
        autoFocus
        label="Search for book ID"
        placeholder={book.BookTitle}
        formatResult={formatResult}
        resultStringKeyName="BookTitle"
        value={book.BookTitle}
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
      <label>Publisher Name:</label>
      <TextField
        id="publisher-select"
        value={book.BookPublisher}
        disabled={true}
        helperText="Please add the publisher"
      ></TextField>
      <label>Publish Date:</label>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          value={book.PublishDate}
          disabled={true}
          onChange={handelDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <label>Author Name:</label>
      <TextField
        id="author-select"
        value={book.BookAuthor}
        helperText="Please add the author"
        disabled={true}
      ></TextField>
      <label>Units:</label>
      <TextField
        id="avilable-units"
        variant="outlined"
        value={book.Units}
        disabled={true}
      />
      <label>Price:</label>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          disabled={true}
          placeholder="price"
          value={book.Price}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <label>Units required:</label>
      <TextField
        error={isUnitsValid(unitReq)}
        id="avilable-units"
        helperText={isUnitsValid(unitReq) ? "Incorrect number of copies" : ""}
        variant="outlined"
        autoComplete="off"
        value={unitReq}
        onChange={(e) => setUnitReq(e.target.value)}
      />
      <Button className="submit" variant="contained" onClick={() => onSubmit()}>
        Save and continute
      </Button>
    </Box>
  );
};

export default BookDetails;
