// 配置是否使用模拟服务器
const USE_MOCK_SERVER = false; // 线上环境固定为false

// 本地模拟服务器配置（本地开发用）
const MOCK_SERVER_CONFIG = {
  host: '127.0.0.1',
  port: 8080,
  url: 'http://127.0.0.1:3000' // 本地网关地址
};

// 真实服务器配置（Vercel线上用）
const DEPLOY_PORT = process.env.PORT || 8080;
const REAL_SERVER_URL = 'https://aigc-video-project-gateway-git-main-qiqis-projects-2f87de45.vercel.app'; // 网关Vercel地址
const REAL_SERVER_PORT = DEPLOY_PORT;

// 后端服务器地址（优先代理用）
const BACKEND_SERVER_URL = REAL_SERVER_URL;

// 微信配置（保留原有配置）
const REAL_WECHAT_CONFIG = {
  appid: 'wx94289b0d2ca7a802',
  secret: '10409c1193a326a7b328f675b1776195'
};

// 获取当前服务器配置
const getCurrentServerConfig = () => {
  if (USE_MOCK_SERVER) {
    return {
      mode: 'mock',
      url: MOCK_SERVER_CONFIG.url,
      host: MOCK_SERVER_CONFIG.host,
      port: MOCK_SERVER_CONFIG.port,
      wechat: {
        useMock: true,
        appid: REAL_WECHAT_CONFIG.appid,
        secret: REAL_WECHAT_CONFIG.secret
      }
    };
  } else {
    return {
      mode: 'real',
      url: REAL_SERVER_URL,
      host: '0.0.0.0',
      port: REAL_SERVER_PORT,
      wechat: {
        useMock: false,
        appid: REAL_WECHAT_CONFIG.appid,
        secret: REAL_WECHAT_CONFIG.secret
      }
    };
  }
};

// 打印配置信息
const printConfig = () => {
  const config = getCurrentServerConfig();
  console.log('====================');
  console.log('服务配置信息');
  console.log('====================');
  console.log(`模式: ${config.mode === 'mock' ? '模拟服务器' : '真实服务器'}`);
  console.log(`地址: ${config.url}`);
  if (config.mode === 'mock') {
    console.log(`本地访问: http://localhost:${config.port}`);
    console.log(`局域网访问: ${config.url}`);
  }
  console.log(`微信模式: ${config.wechat.useMock ? '模拟模式' : '真实模式'}`);
  if (!config.wechat.useMock) {
    console.log(`微信AppID: ${config.wechat.appid}`);
    console.log(`微信Secret: ${config.wechat.secret ? config.wechat.secret.substring(0, 10) + '****' : '无'}`);
  }
  console.log('====================');
};

// 导出配置
module.exports = {
  USE_MOCK_SERVER,
  MOCK_SERVER_CONFIG,
  REAL_SERVER_URL,
  REAL_SERVER_PORT,
  REAL_WECHAT_CONFIG,
  BACKEND_SERVER_URL,
  getCurrentServerConfig,
  printConfig
};