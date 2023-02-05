import { Box } from "@mui/material";
import React from "react";
import SingleCountry from "../singleCountry/SingleCountry";
const CountriesList = ({ countries }) => {
  return (
    <Box>
      {countries.map((props) => (
        <SingleCountry key={props.name} {...props} />
      ))}
    </Box>
  );
};

export default CountriesList;
