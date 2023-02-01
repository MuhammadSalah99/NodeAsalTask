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
import axios from "axios";
const AddNewPublisher = ({ handleClose, setPublisher }) => {
  const [date, setDate] = useState(new Date(""));
  const [name, setName] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const handelDate = (newDate) => {
    setDate(newDate);
  };

  const handleAdd = () => {
    handleClose();
    onSubmit();
    console.log(name);
    setPublisher(name);
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/publishers", {
        name: name,
        date: date,
        isWorking: isWorking,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
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
          autoComplete="off"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            control={
              <Checkbox
                value={isWorking}
                onChange={(e) => setIsWorking(e.target.value)}
              />
            }
            label="Still working ?"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd} variant="contained">
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
