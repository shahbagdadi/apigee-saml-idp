var dt = new Date();
var yr = dt.getUTCFullYear();
var day = dt.getUTCDate();
var mnth = dt.getUTCMonth() + 1;
var hr = dt.getUTCHours();
var mn = dt.getUTCMinutes();
var sec = dt.getUTCSeconds();
var msec = dt.getUTCMilliseconds();


var time = yr + '-' + mnth + '-' + day + 'T' + hr + ':' + mn + ':' + sec + '.' + msec + 'Z';
context.setVariable("myTime", time);
context.setVariable("target.copy.pathsuffix", "false");
