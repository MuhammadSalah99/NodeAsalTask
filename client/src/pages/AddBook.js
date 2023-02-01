import React, { ChangeEvent, useRef, useState, useEffect } from "react";
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
import Dialog from "@mui/material/Dialog";
import { Input } from "@mui/material";

import "./styles.css";

import AddNewPublisher from "./dialouges/AddNewPublisher";
import AddNewAuthor from "./dialouges/AddNewAuthor";
import TagInput from "./tag input/TagInput";
import { isUnitless } from "@mui/material/styles/cssUtils";
import { useForm, Controller } from "react-hook-form";

const AddBook = () => {
  const [listOfPublisher, setListOfPublisher] = useState([""]);
  const [listOfAuthors, setListOfAuthors] = useState([""]);
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState(new Date(""));
  const [author, setAuthor] = useState("");
  const [units, setUnits] = useState("");
  const [price, setPrice] = useState("");
  const [authorId, setAuthorId] = useState();
  const [publisherId, setPublisherid] = useState();
  const [pdfFile, setPdfFile] = useState("");
  const [tags, setTags] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAuthor, setOpenAuthor] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/publishers")
      .then((res) => {
        setListOfPublisher(res.data);
        console.log(listOfPublisher);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3001/authors")
      .then((res) => {
        setListOfAuthors(res.data);
        console.log(listOfAuthors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [publisher, author]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };

  const handelDate = (newDate) => {
    setDate(newDate);
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/books", {
        BookId: bookId,
        BookTitle: bookTitle,
        BookPublisher: publisher,
        PublishDate: date,
        BookAuthor: author,
        BookPdf: pdfFile,
        Tags: tags.toString(),
        Units: units,
        Price: price.toString(),
        AuthorId: authorId ? authorId : listOfAuthors.length,
        PublisherId: publisherId ? publisherId : listOfPublisher.length,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (data) => {
    return data.length <= 0;
  };

  const validateNumbers = (data) => {
    return data < 0;
  };

  return (
    <div className="add-book">
      <h1>Add a new book</h1>
      <Box component="form" className="add-form">
        <TextField
          id="book-id"
          error={validate(bookId)}
          helperText={validate(bookId) ? "Book Id cant be empty" : ""}
          label="Book ID"
          variant="outlined"
          autoComplete="off"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <TextField
          id="book-title"
          error={validate(bookTitle)}
          helperText={validate(bookTitle) ? "Book Title cant be empty" : ""}
          label="Book Title"
          autoComplete="off"
          variant="outlined"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <div className="add-dialogue">
          <TextField
            id="publisher-select"
            select
            error={validate(publisher)}
            helperText={
              validate(publisher)
                ? "Publisher cant be empty"
                : "Please add the publisher"
            }
            label="Select"
            autoComplete="off"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          >
            {listOfPublisher.map((option, key) => (
              <MenuItem key={key} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <button onClick={handleClickOpen} type="button">
            +
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            setPublisher={setPublisher}
            className="add-dialouge"
            fullWidth={true}
          >
            <AddNewPublisher
              handleClose={handleClose}
              setPublisher={setPublisher}
            />
          </Dialog>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handelDate}
            error={validate(date)}
            helperText={
              validate(date) ? "Date cant be empty" : "Please add the date"
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="add-dialogue">
          <TextField
            id="author-select"
            select
            label="Select"
            error={validate(author)}
            helperText={
              validate(author)
                ? "Author cant be empty"
                : "Please add the author"
            }
            autoComplete="off"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            {listOfAuthors.map((option, key) => (
              <MenuItem key={key} value={option.fullName}>
                {option.fullName}{" "}
              </MenuItem>
            ))}
          </TextField>
          <button onClick={handleOpenAuthor} type="button">
            +
          </button>
          <Dialog
            open={openAuthor}
            onClose={handleCloseAuthor}
            className="add-dialouge"
            fullWidth={true}
          >
            <AddNewAuthor
              setAuthor={setAuthor}
              handleCloseAuthor={handleCloseAuthor}
            />
          </Dialog>
        </div>
        <div>
          <label>Book PDF</label>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              onChange={(e) => setPdfFile(e.target.value)}
              hidden
              value={pdfFile}
            />
          </Button>{" "}
        </div>
        <TagInput tags={tags} setTags={setTags} />
        <TextField
          id="avilable-units"
          label="Available  Units"
          variant="outlined"
          error={validateNumbers(units)}
          helperText={
            validateNumbers(units)
              ? "Units should be only 0 or more"
              : "Please add the book amount"
          }
          autoComplete="off"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        />
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            error={validateNumbers(price)}
            helperText={
              validateNumbers(price)
                ? "Price should be only 0 or more"
                : "Please add the price"
            }
            id="outlined-adornment-amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="off"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        {bookId}
        <Button className="submit" variant="contained" onClick={onSubmit}>
          Submit Book
        </Button>
      </Box>
    </div>
  );
};

export default AddBook;
