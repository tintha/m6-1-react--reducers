import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import Seat from "./Seat";

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
        <Centered>
          <CircularProgress />
        </Centered>
      ) : (
        range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId];

                return (
                  <SeatWrapper key={seatId}>
                    <Seat
                      rowIndex={rowName}
                      seatIndex={`${getSeatNum(seatIndex)}`}
                      width={36}
                      height={36}
                      price={seat.price}
                      status={seat.isBooked ? "unavailable" : "available"}
                    />
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
  padding: 8px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  position: relative;
`;

const RowLabel = styled.div`
  font-weight: bold;
  padding: 10px;
  width: 80px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  background: #eee;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export default TicketWidget;
