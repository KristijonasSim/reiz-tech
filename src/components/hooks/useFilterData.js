import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const FILTER_VALUES = {
  REGION: 'Oceania',
  COUNTRY: 'Lithuania',
  SORT_ALPHABET: 'SortZ-A'
}

export const FILTER_TYPES = {
  CONTINENT: 'filterOceania',
  AREA: 'filterLithuania',
  SORT: 'filterSortParams'
}

const useFilterData = (countries) => {
  const [sortedCountries, setSortedCountries] = useState(countries);

  let [searchParams, setSearchParams] = useSearchParams();

  const toggleAlphabetSort = (arr) => [...arr].sort().reverse()

  const handleSortFilter = () => {
    const searchFilter = searchParams.get(FILTER_TYPES.SORT);
    if (searchFilter === FILTER_VALUES.SORT_ALPHABET) {
      setSortedCountries((prevState) => toggleAlphabetSort(prevState))
    }
  }

  const applyFilters = () => {
    let filteredCountries = [...sortedCountries];
    if (searchParams.has(FILTER_TYPES.CONTINENT)) {
      filteredCountries = filteredCountries.filter(country => country.region === FILTER_VALUES.REGION);
    }
    if (searchParams.has(FILTER_TYPES.AREA)) {
      const compareCountry = countries.find(c => c.name === FILTER_VALUES.COUNTRY);
      filteredCountries = filteredCountries.filter(country => country.area < compareCountry.area);
    }
    setSortedCountries(filteredCountries);
  };

  const updateSortedContries = () => {
    if (sortedCountries.length === 0) {
      setSortedCountries(countries)
    }
    else {
      applyFilters()
      handleSortFilter()
    }
  }
  useEffect(() => {

    updateSortedContries()

  }, [searchParams, countries])

  return { sortedCountries, setSortedCountries }
}

export default useFilterData