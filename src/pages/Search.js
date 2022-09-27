import React from "react";
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

import books from "../books";

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

  return (
    <div className="find-book">
      <h1>Find a book</h1>
      <Box component="form" className="find-form">
        <div className="search-row">
          <label>Search by word</label>
          <TextField
            id="book-id"
            className="word-search"
            label="Search By word"
            variant="outlined"
          />
          <FormControl className="select-box">
            <InputLabel id="demo-simple-select-label">Search by</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Search by"
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
            variant="outlined"
          />
          <TextField
            className="input-for-search"
            id="book-id"
            label="End with"
            variant="outlined"
          />
        </div>
        <div className="search-row">
          <Button className="search" variant="contained">
            Search
          </Button>
        </div>
      </Box>

      <div className="export-buttons">
        <div>
          <p>Export as</p>
          <Button variant="contained">PDF</Button>
          <Button variant="contained">CSV</Button>
          <Button variant="contained">Excel</Button>
        </div>
      </div>
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
                  {book.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" className="cell">
                  {book.title}
                </StyledTableCell>
                <StyledTableCell align="right" className="cell">
                  {book.publisher}
                </StyledTableCell>
                <StyledTableCell align="right" className="cell">
                  {book.publish_date}
                </StyledTableCell>
                <StyledTableCell align="right" className="cell">
                  {book.author}
                </StyledTableCell>
                <StyledTableCell align="right" className="cell">
                  {book.tags.map((tag) => `${tag}, `)}
                </StyledTableCell>
                <StyledTableCell align="right" className="cell">
                  {book.avilable_units}
                </StyledTableCell>
                <StyledTableCell align="right" className="cell">
                  {book.unit_price}
                </StyledTableCell>
                <StyledTableCell align="right" className="cell">
                  {book.avilable_units > 0 && <button>reserve</button>}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Search;
