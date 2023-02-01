import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import country_list from "./countries";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import axios from "axios";

const AddNewAuthor = ({ handleCloseAuthor, setAuthor }) => {
  const [first, setFirst] = useState("");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(""));
  const [country, setCountry] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState(new Date(""));
  const [website, setWebsite] = useState("");

  const handelDate = (newDate) => {
    setDateOfBirth(newDate);
  };
  const handleDateOfDeath = (newDate) => {
    setDateOfDeath(newDate);
  };

  const addClose = () => {
    addAuth();
    handleCloseAuthor();
    setAuthor(`${first} ${last}`);
  };

  const addAuth = () => {
    axios
      .post("http://localhost:3001/authors", {
        firstName: first,
        middleName: middle,
        lastName: last,
        fullName: `${first} ${last}`,
        dateOfBirth: dateOfBirth,
        country: country,
        isAlive: true,
        dateOfDeath: dateOfDeath,
        officalWebsite: website,
      })
      .then((res) => {
        console.log(res.log);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-new-author-cont">
      <DialogTitle>Add a New Author</DialogTitle>
      <DialogContent className="add-dialouge-cont-auth">
        <div className="author-row-inputs">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First name"
            type="text"
            autoComplete="off"
            fullWidth
            variant="standard"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Middle name"
            autoComplete="off"
            type="text"
            fullWidth
            variant="standard"
            value={middle}
            onChange={(e) => setMiddle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last name"
            autoComplete="off"
            type="text"
            fullWidth
            variant="standard"
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
        </div>
        <div className="author-row-inputs">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Birth date"
              inputFormat="dd/MM/yyyy"
              value={dateOfBirth}
              className="dates-auth"
              onChange={handelDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl className="select-box">
            <InputLabel id="demo-simple-select-label">
              Select the country
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select the country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              {country_list.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="author-row-inputs">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Death date"
              inputFormat="dd/MM/yyyy"
              value={dateOfDeath}
              className="dates-auth"
              onChange={handleDateOfDeath}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Official Website"
            type="text"
            className="dates-auth"
            autoComplete="off"
            variant="standard"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={addClose} variant="contained">
          Add
        </Button>
        <Button onClick={handleCloseAuthor} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddNewAuthor;
