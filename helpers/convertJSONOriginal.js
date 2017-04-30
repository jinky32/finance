/**
 * Created by stuartbrown on 23/04/2017.
 */

var convertJSON = function convertJSON(inputFile, callback) {


//!! FOR SOME REASON TO EXECUTE THIS FILE YOU HAVE TO RUN THE COMMAND FROM WITHIN THE DIRECTORY!!
    //look at http://stackoverflow.com/questions/41411604/how-to-delete-local-file-with-fs-unlink as poss resoltion
//const csvFilePath='./test.csv';
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

                console.log("The file was saved again!");
                //TODO delete the imported csv file
                fs.unlink("./data/" + inputFile, function (err) {
                    if (err) {
                        console.log("failed to delete local file:"+err);
                    } else {
                        console.log('successfully deleted local file');
                    }
                });
                var jsonFile = inputFile.split('.')[0] + '.json' ;
                console.log('THIS IS jsonfile AS IT COMES FROM convertJSONOriginal' +jsonFile);
                callback(err,jsonFile);
            });

            // log our json to verify it has worked
            //console.log(json);
        });



};


module.exports = {
    convertJSON: convertJSON
};
