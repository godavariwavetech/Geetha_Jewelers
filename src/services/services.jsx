// src/services/services.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yoloo.shop:2040',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Auth
const customerLogin = (customer_mobile_number) =>
  api.post('/public_app/customerlogin', { customer_mobile_number, player_id :"abcdxyz" });

// const logout = () => api.post('/auth/logout');

const services = {
  auth: { customerLogin },
};

export default services;
