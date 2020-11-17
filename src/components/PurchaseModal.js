import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BookingContext } from "./BookingContext";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const {
    state: { status },
    state: { error },
    state: { selectedSeatId },
    state: { price },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  const handleClose = () => {
    cancelBookingProcess();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={selectedSeatId !== null}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Seat: {selectedSeatId}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="credit"
            label="Credit Card"
            type="credit"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
