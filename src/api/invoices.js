import request from '@services/request';

export default {
  getAll: cancelToken =>
    request.get('/api/invoices', { cancelToken }).then(response => response.data),
  getOne: id => request.get(`/api/invoices/${id}`).then(response => response.data),
  create: body => request.post('/api/invoices', body).then(response => response.data),
  update: (id, body) => request.put(`/api/invoices/${id}`, body).then(response => response.data),
  delete: id => request.delete(`/api/invoices/${id}`)
};
