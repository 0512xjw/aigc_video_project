const fs = require('fs').promises;
const path = require('path');

// 数据目录路径（与gateway同级的data文件夹）
const DATA_DIR = path.join(__dirname, '../data');

// 带live前缀的文件路径
const LIVE_STREAMS_FILE = path.join(DATA_DIR, 'live_streams.json');
const LIVE_USERS_FILE = path.join(DATA_DIR, 'live_users.json');
const LIVE_SCHEDULE_FILE = path.join(DATA_DIR, 'live_schedule.json');
const LIVE_DEBATE_FILE = path.join(DATA_DIR, 'live_debate.json');

/**
 * 读取JSON文件
 * @param {string} filePath 文件路径
 * @returns {Promise<Array|Object>} 解析后的数据
 */
async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

/**
 * 写入JSON文件
 * @param {string} filePath 文件路径
 * @param {Array|Object} data 要写入的数据
 */
async function writeData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// -------------------------- 直播流（live_streams）相关 --------------------------
async function getLiveStreams() {
  return readData(LIVE_STREAMS_FILE);
}

async function addLiveStream(stream) {
  const streams = await readData(LIVE_STREAMS_FILE);
  streams.push({ id: `stream_${streams.length + 1}`, ...stream });
  await writeData(LIVE_STREAMS_FILE, streams);
  return streams;
}

// -------------------------- 用户（live_users）相关 --------------------------
async function getLiveUsers() {
  return readData(LIVE_USERS_FILE);
}

async function getLiveUserByUsername(username) {
  const users = await readData(LIVE_USERS_FILE);
  return users.find(user => user.username === username) || null;
}

// -------------------------- 计划（live_schedule）相关 --------------------------
async function getLiveSchedule() {
  const schedule = await readData(LIVE_SCHEDULE_FILE);
  return schedule.length > 0 ? schedule[0] : {};
}

async function setLiveSchedule(schedule) {
  await writeData(LIVE_SCHEDULE_FILE, [schedule]);
}

// -------------------------- 辩论（live_debate）相关 --------------------------
async function getLiveDebate() {
  const debate = await readData(LIVE_DEBATE_FILE);
  return debate.length > 0 ? debate[0] : {};
}

async function setLiveDebate(debate) {
  await writeData(LIVE_DEBATE_FILE, [debate]);
}

// 导出所有方法（带live前缀）
module.exports = {
  liveStreams: {
    get: getLiveStreams,
    add: addLiveStream
  },
  liveUsers: {
    get: getLiveUsers,
    getByUsername: getLiveUserByUsername
  },
  liveSchedule: {
    get: getLiveSchedule,
    set: setLiveSchedule
  },
  liveDebate: {
    get: getLiveDebate,
    set: setLiveDebate
  }
};