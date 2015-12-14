'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (json) {
  var pathValues = [];
  var shouldCreateNewPathValue = true;
  var pushConstant = function pushConstant(value) {
    return pathValues[pathValues.length - 1].value = value;
  };
  var compile = function compile(value) {
    if (value && value.constructor === Object) {
      for (var key in value) {
        if (!key.includes('key') && !key.includes('parent')) {
          if (shouldCreateNewPathValue) {
            pathValues[pathValues.length] = {
              path: [],
              value: null
            };
          }
          shouldCreateNewPathValue = false;
          pathValues[pathValues.length - 1].path.push(key);
          compile(value[key]);
        }
      }
    } else {
      shouldCreateNewPathValue = true;
      pushConstant(value);
    }
  };
  compile(json.json);
  return pathValues;
};
