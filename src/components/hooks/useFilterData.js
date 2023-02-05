import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


const useFilterData = (countries) => {
  const [sortedCountries, setSortedCountries] = useState(countries );

  let [searchParams, setSearchParams] = useSearchParams();

/** put all hardcoded strings to enum
 * 
 * 
 */
  const handleSortFilter = () => {
    /** this function (toggleAlphabet) can be outside the handlesortfilter function */
    const toggleAlphabetSort = (arr) => [...arr].sort().reverse()
    const searchFilter = searchParams.get("filterSortParams");
    if (searchFilter === "SortZ-A") {
      setSortedCountries((prevState) => toggleAlphabetSort(prevState))}}

  const applyFilters = () => {
    let filteredCountries = [...sortedCountries];
    if (searchParams.has("filterOceania")) {
      filteredCountries = filteredCountries.filter(country => country.region === "Oceania");
    }
    if (searchParams.has("filterLithuania")) {
      const compareCountry = countries.find(c => c.name === "Lithuania");
      filteredCountries = filteredCountries.filter(country => country.area < compareCountry.area);
    }
    setSortedCountries(filteredCountries);
  };


  useEffect(() => {
    /** you can create a new function and put everything there, so the use effect jus will call that function, it will look cleaner. */
    if (sortedCountries.length === 0) {
      setSortedCountries(countries)
    }
    else {
      applyFilters()
      handleSortFilter()
    }


  }, [searchParams, countries])

return { sortedCountries, setSortedCountries}
}

export default useFilterData