import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1.0.0',
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
});

class Api {
  constructor(client) {
    this.client = client;
  }
  setInterceptors(handler, errorHandler) {
    this.client.interceptors.response.use(handler, errorHandler);
  }
  setSocketId(socketId) {
    this.client.defaults.headers.common['X-Socket-Id'] = socketId;
  }
  setAuthorizationToken(token) {
    const value = `Bearer ${token}`;
    this.client.defaults.headers.common['Authorization'] = value; // eslint-disable-line dot-notation
  }
}

export default new Api(instance);
