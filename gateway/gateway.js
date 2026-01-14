// gateway/gateway.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

// 后端Flask服务地址
const BACKEND_URL = 'http://127.0.0.1:5000';

// 转发用户接口
app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ code: 500, msg: `网关转发失败：${error.message}` });
    }
});

// 转发直播流接口
app.get('/api/stream', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/stream`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ code: 500, msg: `网关转发失败：${error.message}` });
    }
});

// 转发日程接口
app.get('/api/schedules', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/schedules`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ code: 500, msg: `网关转发失败：${error.message}` });
    }
});

// 转发辩论接口
app.get('/api/debate', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/debate`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ code: 500, msg: `网关转发失败：${error.message}` });
    }
});

// 启动网关服务
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`网关服务运行在 http://127.0.0.1:${PORT}`);
});