import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(data) {
  const response = axios
    .post('/api/users/login', data)
    .then((res) => res.data)
    .catch((err) => err);

  return {
    type: LOGIN_USER,
    payload: response,
  };
}

export function registerUser(data) {
  const response = axios
    .post('/api/users/register', data)
    .then((res) => res.data)
    .catch((err) => err);

  return {
    type: REGISTER_USER,
    payload: response,
  };
}

export function authUser() {
  const response = axios
    .get('/api/users/auth')
    .then((res) => res.data)
    .catch((err) => err);

  return {
    type: AUTH_USER,
    payload: response,
  };
}
