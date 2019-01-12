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
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=468f955c7e77ce16d65edc9a5e436aa2');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

// const getCountries = (currenyCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currenyCode}`)
//           .then((response) => {
//             return response.data.map((country) => country.name);
//           });
// };

// same

const getCountries = async (currenyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currenyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currenyCode}.`)
  }
};

// const convertCurrency = (from, to, amount) => {
//   let convertedAmount;
//   return getExcahngeRate(from, to).then((rate) => {
//     convertedAmount = (amount * rate).toFixed(2);
//     return getCountries(to);
//   }).then((countries) => {
//     return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
//   });
// };

// same

const convertCurrency = async (from, to, amount) => {
  const rate = await getExcahngeRate(from, to);
  const convertedAmount = (amount * rate).toFixed(2);
  const countries = await getCountries(to);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
};

getExcahngeRate('USD', 'CAD').then((rate) => {
  console.log(rate);
});

getCountries('EUR').then((countries) => {
  console.log(countries);
});

convertCurrency('USD', 'CAD', 20).then((message) => {
  console.log(message);
}).catch((e) => {
  console.log(e.message);
});

const add = async (a, b) => a + b + c;

const doWork = async () => {
  try {
    const result = await add(12, 13);
    return result;
  } catch (e) {
    return 10
  }
};

doWork().then((data) => {
  console.log(data);
}).catch((e) => {
  console.log('Something went wrong');
})
