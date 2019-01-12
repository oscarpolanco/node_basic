// http://data.fixer.io/api/latest?access_key=468f955c7e77ce16d65edc9a5e436aa2
const axios = require('axios');

// const getExcahngeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=468f955c7e77ce16d65edc9a5e436aa2')
//           .then((response) => {
//             const euro = 1 / response.data.rates[from];
//             const rate = euro * response.data.rates[to];
//             return rate;
//           });
// };

// same

const getExcahngeRate = async (from, to) => {
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=468f955c7e77ce16d65edc9a5e436aa2');
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
};

// const getCountries = (currenyCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currenyCode}`)
//           .then((response) => {
//             return response.data.map((country) => country.name);
//           });
// };

// same

const getCountries = async (currenyCode) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currenyCode}`);
  return response.data.map((country) => country.name);
};

getExcahngeRate('USD', 'CAD').then((rate) => {
  console.log(rate);
});

getCountries('EUR').then((countries) => {
  console.log(countries);
})
