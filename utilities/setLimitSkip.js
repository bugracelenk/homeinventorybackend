module.exports = (skip, limit) => {
  let options = {};

  if (skip) options.skip = parseInt(skip);
  if (limit) options.limit = parseInt(limit);

  return options;
};
