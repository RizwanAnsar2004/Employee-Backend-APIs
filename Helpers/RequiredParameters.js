const required = (param) => {
  throw new Error(`${param} is required`);
};
module.exports = required;