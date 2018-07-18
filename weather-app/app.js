const yargs = require ('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(result.address);
    // latitud, longitude, callback
    weather.getWeather(result.latitude, result.longitude, (errorMessage, result) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently  ${result.temperature}. It feels like ${result.apparentTemperature}.`);
      }
    });
  }
});
// 4cca74c34a0de7d0d80714857b768351
// https://api.darksky.net/forecast/4cca74c34a0de7d0d80714857b768351/39.9444071,-75.1631718
