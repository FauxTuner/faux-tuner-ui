
export default function request(path, options = { headers: {} }) {
  options.headers = {
    ...options.headers,
    'Accept': 'application/json'
  };
  // let body;
  if (options.body) {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    };
    options.body = JSON.stringify(options.body);
  }
  return fetch(`/api/${path}`, options).then(res => res.json());
}
