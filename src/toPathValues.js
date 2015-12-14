export default json => {
  let pathValues = [];
  let shouldCreateNewPathValue = true;
  const currentPath =[]
  const pushConstant = value =>
    pathValues[pathValues.length - 1].value = value
  const compile = value => {
    if (value && (value.constructor === Object)) {
      for (let key in value) {
        if (!key.includes('key') && !key.includes('parent')) {
          console.log(key);
          currentPath.push(key)
          if (shouldCreateNewPathValue) {
            pathValues[pathValues.length] = {
              path: currentPath.slice(),
              value: null,
            }
          } else {
            pathValues[pathValues.length - 1].path.push(key)
          }
          shouldCreateNewPathValue = false
          compile(value[key])
          currentPath.pop()
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
