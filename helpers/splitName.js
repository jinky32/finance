/**
 * Created by stuartbrown on 21/04/2017.
 */

var splitName = function splitName(input) {
    var parts = input.split('  ');
    return parts[0];
};


module.exports = {
    splitName: splitName
};


