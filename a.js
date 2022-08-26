const transformGetFieldsError = (fn) => {
  function transformFn(args) {
    const res = fn(args);
    return res.map((item) => {
      return {
        errors: item.error,
        name: [item.name],
      };
    });
  }
  return transformFn;
};

const test = (input) => {
  console.log("test", input);
};

const res = transformGetFieldsError(test);
res({ namelist: [1, 2, 3, 4, 5] });
