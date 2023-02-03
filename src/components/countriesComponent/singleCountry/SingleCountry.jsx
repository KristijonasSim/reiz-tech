import styled from "@emotion/styled";
import { Box } from "@mui/system";
import React from "react";

const StyledCountryContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;
`;

const StyledInnerContainer = styled(Box)`
  padding: 8px;
  font-size: 1.2rem;
  background-color: #9ef7ab;
`;

const SingleCountry = ({ name, region, area }) => {
  return (
    <StyledCountryContainer>
      <StyledInnerContainer> Country: {name} </StyledInnerContainer>
      <StyledInnerContainer> Region: {region}</StyledInnerContainer>
      <StyledInnerContainer> Area: {area} km2</StyledInnerContainer>
    </StyledCountryContainer>
  );
};

export default SingleCountry;
