/**
 * Created by stuartbrown on 23/04/2017.
 */

var convertJSON = function convertJSON(inputFile, callback) {


    var fs = require('fs');
    const csv=require('csvtojson');
    console.log('NOW I AM IN convertJSONOriginal');

    const converter=csv({
        noheader:true,
        headers: ['date','vendor','amount'],
        trim:false
    })
        .fromFile('./data/' + inputFile,function(err,result){
            // if an error has occured then handle it
            if(err){
                console.log("An Error Has Occurred");
                console.log(err);
            }
            // create a variable called json and store
            // the result of the conversion

            //var json = result;
            var json = JSON.stringify(result);

            fs.writeFile('./data/' + inputFile.split('.')[0] + '.json', json, function(err) {
                if(err) {
                    return console.log(err);
                }
                var obj;
                fs.readFile('./data/' + inputFile.split('.')[0] + '.json', 'utf8', function (err, data) {
                    if (err) throw err;
                    obj = JSON.parse(data);
                    console.log("Here is the object from jsonconvert "+ JSON.stringify(obj));
                    callback(err,obj);
                });
                console.log("The file was saved!");
                //TODO delete the imported csv file
                fs.unlink("./data/" + inputFile, function (err) {
                    if (err) {
                        console.log("failed to delete local file:"+err);
                    } else {
                        console.log('successfully deleted local file');
                    }
                });

            });

        });
};


module.exports = {
    convertJSON: convertJSON
};
