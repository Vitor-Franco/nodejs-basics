
// /users/:id => /users/1
export function buildRoutePath(path) {
  const routeParameterRegexp = /:([a-zA-Z0-9]+)/g
  const pathWithParams = path.replaceAll(routeParameterRegexp, '(?<$1>[a-zA-Z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}