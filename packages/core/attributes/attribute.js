export default (key, val) => {
  const obj = {};
  obj[key] = val;

  return {
    type: "attr",
    body: obj
  }
}
