import React from "react";
import seat from "../assets/seat-available.svg";
import Tooltip from "./Tooltip";
import styled from "styled-components";
import { BookingContext } from "./BookingContext";

const Seat = ({ rowIndex, seatIndex, width, height, price, status }) => {
  const {
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);
  return (
    <div>
      <Tooltip row={rowIndex} seat={seatIndex} price={price}>
        {status === "unavailable" ? (
          <SeatBtn className="unavailable" disabled>
            <img src={seat} alt="seat" width={width} height={height} />
          </SeatBtn>
        ) : (
          <SeatBtn
            onClick={() =>
              beginBookingProcess({
                status: "seat-selected",
                selectedSeatId: `${rowIndex}-${seatIndex}`,
                price: price,
              })
            }
          >
            <img src={seat} alt="seat" width={width} height={height} />
          </SeatBtn>
        )}
      </Tooltip>
    </div>
  );
};

const SeatBtn = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  &.unavailable {
    filter: grayscale(100%);
  }
  &:focus {
    background-color: #ddd;
  }
`;

export default Seat;
