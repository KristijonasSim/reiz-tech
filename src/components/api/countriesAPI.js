import { restCountriesURL } from "./axiosConfig";

/* this is the enum example */
const COUNTRIES_URL = {
  ALL_COUNTRIES_DATA: '/v2/all?fields=name,region,area'
}

export const countriesAPI = {

  getCountries: () => restCountriesURL.get(COUNTRIES_URL.ALL_COUNTRIES_DATA)
}
