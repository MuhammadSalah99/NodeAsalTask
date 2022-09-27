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

const AddNewAuthor = ({ handleCloseAuthor }) => {
  const [date, setDate] = useState(new Date(""));

  const handelDate = (newDate) => {
    setDate(newDate);
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
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Middle name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last name"
            type="text"
            fullWidth
            variant="standard"
          />
        </div>
        <div className="author-row-inputs">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Birth date"
              inputFormat="dd/MM/yyyy"
              value={date}
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
              value={date}
              className="dates-auth"
              onChange={handelDate}
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
            variant="standard"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAuthor} variant="contained">
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
