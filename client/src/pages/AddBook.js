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

const AddBook = () => {
  const [listOfPublisher, setListOfPublisher] = useState([""]);
  const [listOfAuthors, setListOfAuthors] = useState([""]);
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState(new Date(""));
  const [author, setAuthor] = useState("");
  const [units, setUnits] = useState("");
  const [price, setPrice] = useState(0);
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

  const handleBookId = (event) => {
    setBookId(event.target.value);
  };

  const handleBookTitle = (event) => {
    setBookTitle(event.target.value);
  };

  const handleOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };

  const handelPublisher = (event) => {
    let publir = listOfPublisher.filter((value) => {
      return value.name === event.target.value;
    });
    setPublisherid(publir[0].id);
    console.log(publisherId);

    setPublisher(event.target.value);
  };

  const handelDate = (newDate) => {
    setDate(newDate);
  };

  const handelAuthor = (event) => {
    let authid = listOfAuthors.filter((value) => {
      return value.fullName === event.target.value;
    });
    setAuthorId(authid[0].id);
    console.log(authorId);

    setAuthor(event.target.value);
  };

  const handleUnit = (event) => {
    setUnits(event.target.value);
  };

  const handelPrice = (event) => {
    setPrice(10);
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

  return (
    <div className="add-book">
      <h1>Add a new book</h1>
      <Box component="form" className="add-form">
        <TextField
          id="book-id"
          label="Book ID"
          variant="outlined"
          autoComplete="off"
          value={bookId}
          onChange={handleBookId}
        />
        <TextField
          id="book-title"
          label="Book Title"
          autoComplete="off"
          variant="outlined"
          value={bookTitle}
          onChange={handleBookTitle}
        />
        <div className="add-dialogue">
          <TextField
            id="publisher-select"
            select
            label="Select"
            autoComplete="off"
            value={publisher}
            onChange={handelPublisher}
            helperText="Please add the publisher"
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
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="add-dialogue">
          <TextField
            id="author-select"
            select
            label="Select"
            autoComplete="off"
            value={author}
            onChange={handelAuthor}
            helperText="Please add the author"
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
          autoComplete="off"
          value={units}
          onChange={handleUnit}
        />
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="off"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Button className="submit" variant="contained" onClick={onSubmit}>
          Submit Book
        </Button>
      </Box>
    </div>
  );
};

export default AddBook;
