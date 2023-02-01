import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import ReactSearchBox from "react-search-box";

import "./styles.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#a7c942",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#dee6c9",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Search = () => {
  const searchByType = [
    "Any",
    "Book title",
    "Book Publisher",
    "Book Author",
    "Tags",
  ];

  const [listBooks, setListBooks] = useState([]);
  const [searchType, setSearchType] = useState("Any");
  const [books, setBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSeachType = (e) => {
    setSearchType(e.target.value);
    console.log(searchType);
  };
  const handleSearch = () => {
    switch (searchType) {
      case "Any":
        setBooks(listBooks);
        break;
      case "Book title":
        let searchTitle = listBooks.filter((data) => {
          return data.BookTitle == searchTerm;
        });

        setBooks(searchTitle);
        break;
      case "Book Publisher":
        let searchPublisher = listBooks.filter((data) => {
          return data.BookPublisher == searchTerm;
        });

        setBooks(searchPublisher);
        break;
      case "Book Author":
        let searchAuth = listBooks.filter((data) => {
          return data.BookAuthor == searchTerm;
        });

        setBooks(searchAuth);
        break;
      case "Tags":
        let searchTag = listBooks.filter((data) => {
          return data.Tags == searchTerm;
        });

        setBooks(searchTag);
        break;
    }

    console.log("test");
    console.log(books);
  };
  return (
    <div className="find-book">
      <h1>Find a book</h1>
      {/* <ReactSearchBox
        placeholder="Placeholder"
        value="Doe"
        data={listBooks}
        callback={(record) => console.log(record)}
      /> */}
      <Box component="form" className="find-form">
        <div className="search-row">
          <label>Search by word</label>
          <TextField
            id="book-id"
            className="word-search"
            label="Search By word"
            autoComplete="off"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl className="select-box">
            <InputLabel id="demo-simple-select-label">Search by</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Search by"
              value={searchType}
              onChange={(e) => handleSeachType(e)}
            >
              {searchByType.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="search-row search-row-not-first">
          <label>Available units</label>
          <TextField
            className="input-for-search"
            id="book-id"
            autoComplete="off"
            label="Start with "
            variant="outlined"
          />
          <TextField
            className="input-for-search"
            id="book-id"
            label="End with"
            variant="outlined"
          />
        </div>
        <div className="search-row search-row-not-first">
          <label>Unit Price</label>
          <TextField
            className="input-for-search"
            id="book-id"
            label="Start with"
            autoComplete="off"
            variant="outlined"
          />
          <TextField
            className="input-for-search"
            id="book-id"
            autoComplete="off"
            label="End with"
            variant="outlined"
          />
        </div>
        <div className="search-row">
          <Button className="search" variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </Box>
      {books.length > 0 && (
        <div className="export-buttons">
          <div>
            <p>Export as</p>
            <Button variant="contained">PDF</Button>
            <Button variant="contained">CSV</Button>
            <Button variant="contained">Excel</Button>
          </div>
        </div>
      )}
      {books.length > 0 && (
        <TableContainer component={Paper} className="tabel">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="cell">id</StyledTableCell>
                <StyledTableCell className="cell" align="right">
                  Title
                </StyledTableCell>
                <StyledTableCell className="cell" align="right">
                  Publisher
                </StyledTableCell>
                <StyledTableCell className="cell" align="right">
                  Publish date
                </StyledTableCell>
                <StyledTableCell className="cell" align="right">
                  Author
                </StyledTableCell>
                <StyledTableCell className="cell" align="right">
                  Tags
                </StyledTableCell>
                <StyledTableCell className="cell" align="right">
                  Available units
                </StyledTableCell>
                <StyledTableCell className="cell" align="right">
                  Unit price
                </StyledTableCell>
                <StyledTableCell className="cell" align="right">
                  Reserve
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <StyledTableRow key={book.id}>
                  <StyledTableCell component="th" scope="row" className="cell">
                    {book.BookId}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" className="cell">
                    {book.BookTitle}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="cell">
                    {book.BookPublisher}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="cell">
                    {book.PublishDate}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="cell">
                    {book.BookAuthor}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="cell">
                    {book.Tags}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="cell">
                    {book.Units}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="cell">
                    {book.Price}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="cell">
                    {book.Units > 0 && <button>reserve</button>}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Search;
