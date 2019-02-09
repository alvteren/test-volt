import request from '@services/request';

export default invoiceId => ({
  getAll: cancelToken =>
    request
      .get(`/api/invoices/${invoiceId}/items`, { cancelToken })
      .then(response => response.data),
  getOne: id =>
    request.get(`/api/invoices/${invoiceId}/items/${id}`).then(response => response.data),
  create: body =>
    request.post(`/api/invoices/${invoiceId}/items`, body).then(response => response.data),
  update: (id, body) =>
    request.put(`/api/invoices/${invoiceId}/items/${id}`, body).then(response => response.data),
  delete: id => request.delete(`/api/invoices/${invoiceId}/items/${id}`)
});
