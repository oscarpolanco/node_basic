var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Argument must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(5, 7).then((res) => {
  console.log('Result:', res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log('Should be 45', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});
// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hey. It worked!');
//     // reject('Unable to fullfill promise');
//   }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log('Sucess: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// });
