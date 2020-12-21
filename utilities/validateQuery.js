const validateQuery = (keys = [], query = {}, validQueries = [], exceptions = []) => {
  let filter = {};

  if (exceptions) {
    keys = keys.filter((key) => {
      return !exceptions.includes(key) && validQueries.includes(key);
    });
  }

  keys.map((key) => {
    if (validQueries.includes(key)) {
      filter[key] = query[key];
    }
  });

  return filter;
};

const validateBody = (keys = [], body = {}, validFields = [], validate = false) => {
  let fields = {};

  if (validate) {
    if (keys.length !== validFields.length) {
      return { error: "Eksik Alanlar Var!" };
    }
  }

  keys.map((key) => {
    if (validFields.includes(key)) {
      fields[key] = body[key];
    }
  });

  return fields;
};

module.exports = {
  validateQuery,
  validateBody,
};
