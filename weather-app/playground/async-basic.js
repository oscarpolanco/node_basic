console.log('Staring app');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('Inside of the 2nd callback');
}, 0);

console.log('Finishing app');
