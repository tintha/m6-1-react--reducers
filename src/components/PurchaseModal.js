import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BookingContext } from "./BookingContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
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
          <DialogContentText>
            You are purchasing <b>1</b> ticket for the price of ${price}.
          </DialogContentText>
          <DialogContentText>
            Seat: {selectedSeatId} - Price ${price}
          </DialogContentText>
          <DialogTitle id="form-dialog-title">
            Enter payment details
          </DialogTitle>
          <TextField id="credit-card" label="Credit Card" variant="outlined" />
          <TextField id="expiration" label="Expiration" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
          >
            Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
