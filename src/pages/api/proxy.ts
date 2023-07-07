import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: 'https://localhost:3000/api',
  changeOrigin: true,
});

export default proxy;
