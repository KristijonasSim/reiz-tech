import * as React from "react";
import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { countriesAPI } from "./components/api/countriesAPI";
import useFilterData from "./components/hooks/useFilterData";
import CountriesList from "./components/countriesComponent/countries/CountriesList";
import { StyledFilterButton } from "./components/button/StyledFilterButton";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";

const StyledMainContainer = styled(Box)`
  padding: 20px 35px;
  background-color: #e8ffee;
  margin: 0;
`;

const StyledButtonsContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const [filter, setFilter] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const { sortedCountries, setSortedCountries } = useFilterData(countries);

  useEffect(() => {
    countriesAPI
      .getCountries()
      .then((data) => setCountries(data.data))
      .catch((error) => console.log(error));
  }, []);

  const restoreCountries = async () => setSortedCountries(countries);

  /* TODO 
  create one function from handleOceaniaParams, handleLithuaniaParams, handleSortParams and pass filters type as the argument. Choose the right naming to specify what that function do.
  for all hardcoded string create enums.

  
  */
  const handleOceaniaParams = (filterType, filterValue) => {
    let newSearchParams = new URLSearchParams(searchParams);
    if (!newSearchParams.has("filterOceania")) {
      newSearchParams.set("filterOceania", "Oceania");
    } else {
      /** you can create a const with cllear naming and add it in the if check, the from that const naming it would be more clear wwhat means newSearchParams.get("filterType") === "Oceania"
       *
       */
      if (newSearchParams.get("filterOceania") === "Oceania") {
        restoreCountries();

        newSearchParams.delete("filterOceania");
      }
    }
    setSearchParams(newSearchParams);
  };

  const handleLithuaniaParams = () => {
    setFilter(!filter);
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

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = sortedCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const handleChange = (event, value) => {
    /** this function just calls other function, so you can just set state in jsx */
    setCurrentPage(value);
  };

  return (
    <StyledMainContainer>
      <StyledButtonsContainer>
        <Box>
          <StyledFilterButton
            isActivated={searchParams.has("filterLithuania") ? "active" : null}
            onClick={handleLithuaniaParams}
          >
            Smaller than Lithuania
          </StyledFilterButton>
          <StyledFilterButton
            isActivated={searchParams.has("filterOceania") ? "active" : null}
            onClick={handleOceaniaParams}
          >
            Oceania
          </StyledFilterButton>
        </Box>
        <StyledFilterButton
          isActivated={searchParams.has("filterSortParams") ? "active" : null}
          onClick={handleSortParams}
        >
          Z-A
        </StyledFilterButton>
      </StyledButtonsContainer>
      <CountriesList countries={currentCountries} />
      {sortedCountries.length > countriesPerPage ? (
        <Pagination
          count={Math.ceil(sortedCountries.length / countriesPerPage)}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      ) : null}
    </StyledMainContainer>
  );
};

export default App;
