const route = (path, view) =>
  createFragment("route", {
    path,
    view,
  });

const createFragment = (type, attrs) => ({
  f_type: type,
  ...attrs,
});

export { route };
