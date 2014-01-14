// test case:
// 1. node mongodb_test.js
// 2. after connection is established stop the mongodb server (5 sec window)
// 3. when insert is called, it will keep on trying to finish, postponing the
//    callback
// 4. restart mongodb server
// 5. insert finishes and calls the callback with (err=null, res=result)
//    this should mean the write finished successfully, but alas, the document
//    is lost!!
var mongo = require('mongodb').MongoClient;
mongo.connect('mongodb://10.10.10.11/test?w=1', function (err, db) {
  if (err) throw err;
  var col = db.collection('test');
  setTimeout(function () {
    console.log('inserting...');
    col.insert({sucks_hard: true}, function (err, res) {
      if (err) throw err;
      console.log(res);
      process.exit(0);
    });
  }, 5000);
});
