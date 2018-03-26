import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}

export default function callApi(endpoint, method = 'get', body, headers = {}) {
  headers['content-type'] = 'application/json';
  const bodyData = method == 'get' ? undefined : JSON.stringify(body);

  return fetch(`${API_URL}/${endpoint}`, {
    headers: headers,
    method,
    body: bodyData,
  })
  .then(checkHttpStatus)
  .then(parseJSON)
  .then(response => {
    return response;
  });
}
