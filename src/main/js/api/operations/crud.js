import superagent from 'superagent';

export const crudRequests = {
   create: (url, body) => superagent.post(`${API_ROOT}${url}`, body).ok((res) => res.status < 500).then((response) => JSON.parse(response.text)),
   delete: (url, id) => superagent.delete(`${API_ROOT}${url}${id}`).ok((res) => res.status < 500).then((response) => JSON.parse(response.text)),
   read: (url) => superagent.get(`${API_ROOT}${url}`).then((response) => JSON.parse(response.text)),
   update: (url, id, body) => superagent.put(`${API_ROOT}${url}${id}`, body).ok((res) => res.status < 500).then((response) => JSON.parse(response.text))
};
