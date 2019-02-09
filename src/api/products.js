import request from '@services/request';

export default {
  getAll: () => request.get('/api/products').then(response => response.data),
  getOne: id => request.get(`/api/products/${id}`).then(response => response.data),
  create: body => request.post('/api/products', body).then(response => response.data),
  update: (id, body) => request.put(`/api/products/${id}`, body).then(response => response.data),
  delete: id => request.delete(`/api/products/${id}`),
  getOptions: cancelToken =>
    request.get('/api/products', { cancelToken }).then(response => response.data)
};
