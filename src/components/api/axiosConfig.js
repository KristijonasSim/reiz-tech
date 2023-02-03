import axios from 'axios'

export const restCountriesURL = axios.create({
  baseURL: "https://restcountries.com"
})