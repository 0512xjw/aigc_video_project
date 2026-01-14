const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

// 适配Vercel环境的后端地址
const BACKEND_URL = os.environ.get("VERCEL")
    ? "https://你的vercel项目域名/backend-api"  // 后续替换为实际Vercel域名
    : "http://127.0.0.1:5000";

// 接口转发逻辑保持不变（后续代码省略）
app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ code: 500, msg: `网关转发失败：${error.message}` });
    }
});

// 其他接口转发逻辑保持不变

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`网关服务运行在 http://127.0.0.1:${PORT}`);
});