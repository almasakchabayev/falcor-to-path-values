export default (json) => {
  const pathValues = [];
  let shouldCreateNewPathValue = true;
  const pushConstant = (value) =>
    pathValues[pathValues.length - 1].value = value
  const compile = (value) => {
    if (value && (value.constructor === Object)) {
      for (let key in value) {
        if (!key.includes('key') && !key.includes('parent')) {
          if (shouldCreateNewPathValue) {
            pathValues[pathValues.length] = {
              path: [],
              value: null,
            }
          }
          shouldCreateNewPathValue = false
          pathValues[pathValues.length - 1].path.push(key)
          compile(value[key])
        }
      }
    } else {
      shouldCreateNewPathValue = true
      pushConstant(value);
    }
  }
  compile(json.json)
  return pathValues
}
