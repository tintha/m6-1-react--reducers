import React from "react";
import { SeatContext } from "./SeatContext";
import GlobalStyles from "./GlobalStyles";
import TicketWidget from "./TicketWidget";

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        receiveSeatInfoFromServer(data);
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
    </>
  );
}

export default App;
