import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import seat from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";
import Tooltip from "./Tooltip";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { numOfRows },
    state: { seatsPerRow },
    state: { hasLoaded },
    state: { seats },
  } = React.useContext(SeatContext);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  return (
    <Wrapper>
      {!hasLoaded ? (
        <CircularProgress />
      ) : (
        range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

                return (
                  <SeatWrapper key={seatId}>
                    <Tooltip
                      row={rowName}
                      seat={`${getSeatNum(seatIndex)}`}
                      price={seats[seatId].price}
                    >
                      {/* TODO: Render the actual <Seat /> */}
                      {seats[seatId].isBooked ? (
                        <Seat src={seat} alt="seat" className="unavailable" />
                      ) : (
                        <Seat src={seat} alt="seat" />
                      )}
                    </Tooltip>
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const Seat = styled.img`
  &.unavailable {
    filter: grayscale(100%);
  }
`;

export default TicketWidget;
