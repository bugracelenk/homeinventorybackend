const returnError = (errMessage) => {
  return {
    status: false,
    message: errMessage,
  };
};

module.exports = { returnError };
