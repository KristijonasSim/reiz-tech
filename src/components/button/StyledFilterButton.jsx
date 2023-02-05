import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledFilterButton = styled(Button)`
  background: none rgb(0, 255, 0);
  color: ${(props) => (props.isActivated ? "white" : "black")};
  background-color: ${(props) => (props.isActivated ? "none" : "#16c406")};
  font-family: sans-serif;
  font-weight: 700;
  padding: 8px 12px;
  font-size: 1rem;
  margin: 10px;
  transition: background-color 0.14s ease 0s, color 0.14s ease 0s;
  &:hover {
    background-color: rgb(0, 204, 0);
    color: rgb(25, 25, 25);
  }
  &.active {
    background-color: #fff;
  }
`;
;
