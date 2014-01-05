(function(root) {
  var assert = function (title, expect, actual) {
    if(expect == actual)
      console.log(title + ': true');
    else
      console.log(title + ': false', 'Except:' + expect, 'Actual: ' + actual);
  };
  if(typeof(module) != 'undefined')
    global.assert = assert;
  else if(root)
    root.assert = assert;
})(this);
