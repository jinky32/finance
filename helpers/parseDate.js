/**
 * Created by stuartbrown on 18/04/2017.
 */
// parse a date in dd/mm/yyyy format

var stringToDate = function stringToDate(input) {
    var parts = input.split('/');
    //console.log(parts);
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[2], parts[1]-1, parts[0]);
};


module.exports = {
    stringToDate: stringToDate
};