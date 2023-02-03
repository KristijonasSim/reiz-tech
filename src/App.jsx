import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { countriesAPI } from "./components/api/countriesAPI";
import useFilterData from "./components/hooks/useFilterData";
import CountriesList from "./components/countriesComponent/countries/CountriesList";
import { StyledFilterButton } from "./components/button/StyledFilterButton";
import { useSearchParams } from "react-router-dom";





const App = () => {
  const [countries, setCountries] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  const { sortedCountries, setSortedCountries } = useFilterData(countries);


  useEffect(() => {
    countriesAPI
      .getCountries()
      .then((data) => setCountries(data.data))
      .catch((error) => console.log(error));
  }, []);


  const restoreCountries = async () => setSortedCountries(countries);


  const handleOceaniaParams = () => {
    let newSearchParams = new URLSearchParams(searchParams);
    if (!newSearchParams.has("filterOceania")) {
      newSearchParams.set("filterOceania", "Oceania");
    } else {
      if (newSearchParams.get("filterOceania") === "Oceania") {
        restoreCountries();

        newSearchParams.delete("filterOceania");
      }
    }
    setSearchParams(newSearchParams);
  };

  const handleLithuaniaParams = () => {
    let newSearchParams = new URLSearchParams(searchParams);
    if (!newSearchParams.has("filterLithuania")) {
      newSearchParams.set("filterLithuania", "Lithuania");
    } else {
      if (newSearchParams.get("filterLithuania") === "Lithuania") {
        restoreCountries();
        newSearchParams.delete("filterLithuania");
      }
    }
    setSearchParams(newSearchParams);
  };

  const handleSortParams = () => {
    let newSearchParams = new URLSearchParams(searchParams);
    if (!newSearchParams.has("filterSortParams")) {
      newSearchParams.set("filterSortParams", "SortZ-A");
    } else {
      if (newSearchParams.get("filterSortParams") === "SortZ-A") {
        restoreCountries();
        newSearchParams.delete("filterSortParams");
      }
    }
    setSearchParams(newSearchParams);
  };

  return (
    <Box>
      <Box>
        <StyledFilterButton onClick={handleLithuaniaParams}>
          Smaller than Lithuania
        </StyledFilterButton>
        <StyledFilterButton onClick={handleOceaniaParams}>
          Oceania
        </StyledFilterButton>
        <StyledFilterButton onClick={handleSortParams}>Z-A</StyledFilterButton>
      </Box>
      <CountriesList countries={sortedCountries} />
    </Box>
  );
};

export default App;
