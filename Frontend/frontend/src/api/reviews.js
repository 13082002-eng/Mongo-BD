import api from "./axios";

export const getReviews = (productId) => {
  return api.get(`/products/${productId}/reviews`);
};

export const createReview = (productId, review) => {
  return api.post(`/products/${productId}/reviews`, review);
};