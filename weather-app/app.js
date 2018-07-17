// const yargs = require ('yargs');
//
// const geocode = require('./geocode/geocode');
// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'Address to fetch weather for',
//       string: true
//     }
// })
// .help()
// .alias('help', 'h')
// .argv;
//
// geocode.geocodeAddress(argv.address, (errorMessage, result) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(result, undefined, 2));
//   }
// });
const request = require('request');
request({
  url: 'https://api.darksky.net/forecast/4cca74c34a0de7d0d80714857b768351/39.9444071,-75.1631718',
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(body.currently.temperature);
  } else {
    console.log('Unable to fetch weather');
  }
});
// 4cca74c34a0de7d0d80714857b768351
// https://api.darksky.net/forecast/4cca74c34a0de7d0d80714857b768351/39.9444071,-75.1631718
