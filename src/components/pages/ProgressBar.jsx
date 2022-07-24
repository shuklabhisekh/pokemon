import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledDiv = styled("div")`
  background-color: #bcbcbc;
`;

const StyledBar = styled("div")`
  background-color: green;
  height: 4px;
  width: ${({ completed }) => completed}%;
`;

const ProgressBar = props => {
  return (
    <StyledDiv>
      <StyledBar completed={props.completed} />
    </StyledDiv>
  );
};

ProgressBar.propTypes = {
  completed: PropTypes.number.isRequired
};

export default ProgressBar;
