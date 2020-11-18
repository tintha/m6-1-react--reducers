import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BookingContext } from "./BookingContext";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FormDialog() {
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");
  const classes = useStyles();
  const {
    state: { status },
    state: { error },
    state: { selectedSeatId },
    state: { price },
    actions: { cancelBookingProcess },
    actions: { purchaseTicketRequest },
    actions: { purchaseTicketSuccess },
    actions: { purchaseTicketFailure },
  } = React.useContext(BookingContext);

  const handleClose = () => {
    cancelBookingProcess();
  };

  const handleChangeCredit = (e) => {
    const creditInput = e.target.value;
    setCreditCard(creditInput);
  };

  const handleChangeExpiration = (e) => {
    const expInput = e.target.value;
    setExpiration(expInput);
  };

  const handlePurchase = (e) => {
    purchaseTicketRequest({
      status: "awaiting-response",
      error: null,
      selectedSeatId: selectedSeatId,
      price: price,
    });
    fetch("/api/book-seat", {
      method: "POST",
      body: JSON.stringify({
        seatId: selectedSeatId,
        creditCard: creditCard,
        expiration: expiration,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          console.log(resp.status);
          purchaseTicketSuccess({
            status: "purchased",
            error: null,
            selectedSeatId: null,
            price: null,
          });
        } else if (resp.message) {
          console.log(resp.message);
          purchaseTicketFailure({
            status: "error",
            error: resp.message,
            selectedSeatId: selectedSeatId,
            price: price,
          });
        }
      });
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
            You are purchasing <b>1</b> ticket for the price of $
            {price && price}.
          </DialogContentText>
          <SeatDetailsContainer>
            <SeatDetailsRow>
              <DialogContentText>
                <b>Row</b>
              </DialogContentText>
              <DialogContentText>
                <b>Seat</b>
              </DialogContentText>
              <DialogContentText>
                <b>Price</b>
              </DialogContentText>
            </SeatDetailsRow>
            <SeatDetailsRow>
              <DialogContentText>
                {selectedSeatId && selectedSeatId.substring(0, 1)}
              </DialogContentText>
              <DialogContentText>
                {selectedSeatId && selectedSeatId.match(/\d+/)}
              </DialogContentText>
              <DialogContentText>${price && price}</DialogContentText>
            </SeatDetailsRow>
          </SeatDetailsContainer>
          <DialogTitle id="form-dialog-title">
            Enter payment details
          </DialogTitle>
          <PaymentDetails>
            <TextField
              id="credit-card"
              label="Credit Card"
              variant="outlined"
              value={creditCard}
              onChange={(e) => handleChangeCredit(e)}
            />
            <TextField
              id="expiration"
              label="Expiration"
              variant="outlined"
              value={expiration}
              onChange={(e) => handleChangeExpiration(e)}
            />
            <Button
              onClick={(e) => handlePurchase(e)}
              variant="contained"
              size="large"
              color="primary"
              className={classes.margin}
            >
              Purchase
            </Button>
          </PaymentDetails>
        </DialogContent>
        <DialogActions>
          <Error>
            {status === "awaiting-response" && <CircularProgress />}
            <DialogContentText
              style={{ color: "red", textAlign: "left", fontWeight: "bold" }}
            >
              {error}
            </DialogContentText>
          </Error>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const PaymentDetails = styled.div`
  display: flex;
`;

const Error = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SeatDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  margin: auto;
`;

const SeatDetailsRow = styled.div`
  border-bottom: 1px solid gray;
  display: flex;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
