/**
 * Created by stuartbrown on 30/04/2017.
 */
var string = 'hello';
var myCallback = function(err, string, data) {
    console.log(string);
    if (err) throw err; // Check for the error and throw if it exists.
    console.log('got data: '+data); // Otherwise proceed as usual.
};

var usingItNow = function(callback) {

    callback(null, 'get it?'); // I dont want to throw an error, so I pass null for the error argument
};

usingItNow(myCallback);

//
//convertJSON.convertJSON(req.file.filename, function(err, file){
//    if (err){
//        console.log('fikkin erro man');
//    } else {
//        console.log('all was good '+file);
//    }
//});
//
//upload.statementSeeder("../data/" + req.file.filename.split('.')[0] + ".json");
