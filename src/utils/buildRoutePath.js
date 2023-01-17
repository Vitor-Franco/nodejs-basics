
// /users/:id => /users/1
export function buildRoutePath(path) {
  const routeParameterRegexp = /:([a-zA-Z0-9]+)/g

  console.log(path.matchAll(routeParameterRegexp));
}