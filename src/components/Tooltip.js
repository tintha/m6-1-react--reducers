import React from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";

const Tooltip = ({ row, seat, price, children }) => {
  return (
    <Tippy
      delay={1000}
      content={
        <Wrapper>
          Row {row}, Seat {seat} - ${price}
        </Wrapper>
      }
    >
      {children}
    </Tippy>
  );
};

const Wrapper = styled.div`
  padding: 4px;
  background-color: #000;
  color: #fff;
`;

export default Tooltip;
