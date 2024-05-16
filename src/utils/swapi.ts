
export enum SWAPIRoutes {
  Planets = 'planets',
  People = 'people',
  Films = 'films',
}

export const getSWAPIEndpoint = (route: SWAPIRoutes, id?: number): string => {
  let endpoint = `https://swapi.dev/api/${route}/`;
  if (id) {
    endpoint += `${id}/`;
  }
  return endpoint;
};
