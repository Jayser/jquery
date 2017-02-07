import config from '../config';

export const formatUrl = (path) => {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return `http://${ config.apiHost }:${ config.apiPort }/api${ adjustedPath }`;
};
