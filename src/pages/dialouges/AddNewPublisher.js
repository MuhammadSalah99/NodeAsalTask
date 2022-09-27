import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

const AddNewPublisher = ({ handleClose }) => {
  const [date, setDate] = useState(new Date(""));

  const handelDate = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="add-new-publiser">
      <DialogTitle>Add New publisher</DialogTitle>
      <DialogContent className="add-dialouge-cont">
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Publisher Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Establish Date"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handelDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Still working ?"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Add
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddNewPublisher;
