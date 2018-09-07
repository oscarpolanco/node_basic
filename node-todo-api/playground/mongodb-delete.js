const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // On Users delete all docs that have the same name and Mike\
  db.collection('Users').deleteMany({name: 'Test'}).then((result) => {
    console.log(`result 1: ${result}`);
  });


  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b6f237d381c846cea71478a')}).then((result) => {
    console.log(`result 2: ${JSON.stringify(result, undefined, 2)}`);
  });
  // client.close();
});
