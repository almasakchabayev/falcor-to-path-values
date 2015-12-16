'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _falcorJsonGraph = require('falcor-json-graph');

exports.default = function (json) {
  var pathValues = [];
  var shouldCreateNewPathValue = true;
  var currentPath = [];
  var pushValue = function pushValue(value) {
    shouldCreateNewPathValue = true;
    pathValues[pathValues.length - 1].value = value;
  };
  var getRefKey = function getRefKey(obj) {
    var result = false;
    for (var key in obj) {
      if (key.includes('path')) {
        result = key;
        return result;
      }
    }
  };
  var compile = function compile(value) {
    if (value && value.constructor === Object) {
      var refKey = getRefKey(value);
      if (refKey) {
        pushValue((0, _falcorJsonGraph.ref)(value[refKey]));
      } else {
        for (var key in value) {
          if (!key.includes('key') && !key.includes('parent')) {
            currentPath.push(key);
            if (shouldCreateNewPathValue) {
              pathValues[pathValues.length] = {
                path: currentPath.slice(),
                value: null
              };
            } else {
              pathValues[pathValues.length - 1].path.push(key);
            }
            shouldCreateNewPathValue = false;
            compile(value[key]);
            currentPath.pop();
          }
        }
      }
    } else if (value && value.constructor === Array) {
      pushValue((0, _falcorJsonGraph.ref)(value));
    } else {
      pushValue(value);
    }
  };
  compile(json.json);
  return pathValues;
};
