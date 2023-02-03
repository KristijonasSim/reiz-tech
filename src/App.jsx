import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { countriesAPI } from "./components/api/countriesAPI";
import CountriesList from "./components/countriesComponent/countries/CountriesList";
const App = () => {
  const [ countries, setCountries ] = useState([])

  console.log(countries)
  useEffect(() => {
  countriesAPI
    .getCountries()
    .then((data) => setCountries(data.data))
    .catch((erorr) => console.log(erorr));
  }, [])


  return (
    <Box>
      <CountriesList countries={countries} />
    </Box>
  );
};

export default App;
