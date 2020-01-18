import superagent from 'superagent';

const API_ROOT = 'http://localhost:8080';

const crudRequests = {
   get: (url) => superagent.get(`${API_ROOT}${url}`).then((response) => JSON.parse(response.text)),
   post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).ok((res) => res.status < 500).then((response) => JSON.parse(response.text)),
   put: (url, id, body) => superagent.put(`${API_ROOT}${url}${id}`, body).ok((res) => res.status < 500).then((response) => JSON.parse(response.text)),
   delete: (url, id) => superagent.delete(`${API_ROOT}${url}${id}`).ok((res) => res.status < 500).then((response) => JSON.parse(response.text))
};

export default crudRequests;
