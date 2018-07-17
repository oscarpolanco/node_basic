var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hey. It worked!');
    // reject('Unable to fullfill promise');
  }, 2500);
});

somePromise.then((message) => {
  console.log('Sucess: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
