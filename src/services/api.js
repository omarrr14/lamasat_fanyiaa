import api from '../lib/axios';

// Products
export const getProducts = () => api.get('/api/products');
export const createProduct = (formData) => api.post('/api/products', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const getProductById = (id) => api.get(`/api/products/${id}`);
export const updateProduct = (id, formData) => api.put(`/api/products/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const deleteProduct = (id) => api.delete(`/api/products/${id}`);

// Coupons
export const getCoupons = () => api.get('/api/coupons');
export const createCoupon = (data) => api.post('/api/coupons', data);
export const getCouponById = (id) => api.get(`/api/coupons/${id}`);
export const updateCoupon = (id, data) => api.put(`/api/coupons/${id}`, data);
export const deleteCoupon = (id) => api.delete(`/api/coupons/${id}`);
export const assignCouponToProducts = (couponId, productIds) => api.post(`/api/coupons/${couponId}/assign`, { productIds });
export const removeCouponFromProducts = (couponId, productIds) => api.delete(`/api/coupons/${couponId}/remove`, { data: { productIds } });
export const getProductsByCoupon = (couponId) => api.get(`/api/coupons/${couponId}/products`);
