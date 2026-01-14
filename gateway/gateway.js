// 导入依赖
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000; // Vercel自动分配端口

// 跨域配置
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// 配置后端地址：区分本地/Vercel环境
const isVercel = !!process.env.VERCEL;
const BACKEND_URL = isVercel
  ? "https://aigc-video-project-backend-git-main-qiqis-projects-2f87de45.vercel.app" // 后端Vercel地址
  : "http://127.0.0.1:5000"; // 本地后端地址

// 封装通用API转发函数
const proxyApi = async (req, res, apiPath) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${BACKEND_URL}${apiPath}`,
      params: req.query,
      data: req.body
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const errorMsg = error.response?.data?.msg || error.message || "网关转发失败";
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({ code: statusCode, msg: errorMsg });
  }
};

// 转发所有API接口
app.get('/api/users', (req, res) => proxyApi(req, res, '/api/users'));
app.get('/api/stream', (req, res) => proxyApi(req, res, '/api/stream'));
app.get('/api/debate', (req, res) => proxyApi(req, res, '/api/debate'));
app.get('/api/schedules', (req, res) => proxyApi(req, res, '/api/schedules'));

// 根路由健康检查
app.get('/', (req, res) => {
  res.json({ code: 200, msg: "网关服务运行正常", data: { backendUrl: BACKEND_URL } });
});

// 启动服务
app.listen(port, () => {
  console.log(`网关服务运行在: ${isVercel ? 'Vercel线上' : `http://127.0.0.1:${port}`}`);
});

// 暴露app供Vercel识别
module.exports = app;