import React from "react";
export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "begin-booking-process": {
      return {
        ...state,
        status: action.status,
        error: action.error,
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    }
    case "cancel-booking-process": {
      return {
        ...state,
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    case "purchase-ticket-request": {
      return {
        ...state,
        status: "awaiting-response",
        error: action.error,
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    }
    case "purchase-ticket-failure": {
      return {
        ...state,
        status: "error",
        error: action.error,
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    }
    case "purchase-ticket-success": {
      return {
        ...state,
        status: "purchased",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  const cancelBookingProcess = (data) => {
    dispatch({
      type: "cancel-booking-process",
      ...data,
    });
  };

  const purchaseTicketRequest = (data) => {
    dispatch({
      type: "purchase-ticket-request",
      ...data,
    });
  };

  const purchaseTicketFailure = (data) => {
    dispatch({
      type: "purchase-ticket-failure",
      ...data,
    });
  };

  const purchaseTicketSuccess = (data) => {
    dispatch({
      type: "purchase-ticket-success",
      ...data,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketFailure,
          purchaseTicketSuccess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
