import * as React from "react";
import { Box, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { countriesAPI } from "./components/api/countriesAPI";
import useFilterData, {
  FILTER_VALUES,
  FILTER_TYPES,
} from "./components/hooks/useFilterData";
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

  let [searchParams, setSearchParams] = useSearchParams();

  const { sortedCountries, setSortedCountries } = useFilterData(countries);

  useEffect(() => {
    countriesAPI
      .getCountries()
      .then((data) => setCountries(data.data))
      .catch((error) => console.log(error));
  }, []);

  const restoreCountries = async () => setSortedCountries(countries);

  const handleFilterParams = (filterType, filterValue) => {
    let newSearchParams = new URLSearchParams(searchParams);
    if (!newSearchParams.has(filterType)) {
      newSearchParams.set(filterType, filterValue);
    } else {
      if (newSearchParams.get(filterType) === filterValue) {
        restoreCountries();
        newSearchParams.delete(filterType);
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

  return (
    <StyledMainContainer>
      <StyledButtonsContainer>
        <Box>
          <StyledFilterButton
            isActivated={searchParams.has(FILTER_TYPES.AREA) ? "active" : null}
            onClick={() =>
              handleFilterParams(FILTER_TYPES.AREA, FILTER_VALUES.COUNTRY)
            }
          >
            Smaller than Lithuania
          </StyledFilterButton>
          <StyledFilterButton
            isActivated={
              searchParams.has(FILTER_TYPES.CONTINENT) ? "active" : null
            }
            onClick={() =>
              handleFilterParams(FILTER_TYPES.CONTINENT, FILTER_VALUES.REGION)
            }
          >
            Oceania
          </StyledFilterButton>
        </Box>
        <StyledFilterButton
          isActivated={searchParams.has(FILTER_TYPES.SORT) ? "active" : null}
          onClick={() =>
            handleFilterParams(FILTER_TYPES.SORT, FILTER_VALUES.SORT_ALPHABET)
          }
        >
          Z-A
        </StyledFilterButton>
      </StyledButtonsContainer>
      <CountriesList countries={currentCountries} />
      {sortedCountries.length > countriesPerPage ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(sortedCountries.length / countriesPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      ) : null}
    </StyledMainContainer>
  );
};

export default App;
