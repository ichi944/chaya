import axios, { AxiosInstance } from 'axios';

const instance = axios.create({
  baseURL: '/api/v1.0.0',
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
});

class Api {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  setInterceptors(handler, errorHandler): void {
    this.client.interceptors.response.use(handler, errorHandler);
  }
  setSocketId(socketId: string): void {
    this.client.defaults.headers.common['X-Socket-Id'] = socketId;
  }
  clearSocketId(): void {
    delete this.client.defaults.headers.common['X-Socket-Id'];
  }
  setAuthorizationToken(token: string): void {
    const value = `Bearer ${token}`;
    this.client.defaults.headers.common.Authorization = value;
  }
  clearAuthorizationToken(): void {
    delete this.client.defaults.headers.common.Authorization;
  }
}

export default new Api(instance);
