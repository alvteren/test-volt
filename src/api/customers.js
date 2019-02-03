import request from '@services/request';

export default {
  getAll: () => request.get('/api/customers').then(response => response.data),
  getOne: id => request.get(`/api/customers/${id}`).then(response => response.data),
  create: body => request.post('/api/customers', body).then(response => response.data),
  update: (id, body) => request.put(`/api/customers/${id}`, body).then(response => response.data),
  delete: id => request.delete(`/api/customers/${id}`)
};
