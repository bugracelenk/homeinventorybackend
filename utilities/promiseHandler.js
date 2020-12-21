const promiseHandler = (promise) => {
  if (promise.then && promise.catch) {
    return promise
      .then((data) => [null, data])
      .catch((err) => {
        if (err.message) return [err.message];
        else return [err];
      });
  } else if (typeof promise !== "function") {
    return [null, promise];
  } else {
    return ["Not promise!"];
  }
};

module.exports = promiseHandler;
