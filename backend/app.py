from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # 允许跨域
app.config['JSON_AS_ASCII'] = False  # 解决中文乱码

# 接口：获取用户列表
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({
        "code": 200,
        "msg": "success",
        "data": [
            {"avatar": "https://via.placeholder.com/40", "id": 1, "name": "观众1", "role": "viewer"},
            {"avatar": "https://via.placeholder.com/40", "id": 2, "name": "主播", "role": "host"},
            {"avatar": "https://via.placeholder.com/40", "id": 3, "name": "辩论嘉宾", "role": "guest"}
        ]
    })

# 接口：获取直播流信息
@app.route('/api/stream', methods=['GET'])
def get_stream():
    return jsonify({
        "code": 200,
        "msg": "直播流数据获取成功",
        "data": {
            "streamUrl": "https://example.com/live/ai-debate.m3u8",
            "status": "online",
            "viewerCount": 1200,
            "liveTitle": "AI发展利大于弊辩论赛"
        }
    })

# 接口：获取辩论数据
@app.route('/api/debate', methods=['GET'])
def get_debate():
    return jsonify({
        "code": 200,
        "msg": "辩论数据获取成功",
        "data": {
            "topic": "人工智能的发展对人类社会利大于弊吗？",
            "positiveTeam": "科技派",
            "negativeTeam": "保守派",
            "progress": "自由辩论阶段",
            "remainingTime": "5分钟"
        }
    })

# 接口：获取日程安排
@app.route('/api/schedules', methods=['GET'])
def get_schedules():
    return jsonify({
        "code": 200,
        "msg": "日程数据获取成功",
        "data": [
            {"id": 1, "title": "辩论赛彩排", "time": "2026-01-16 14:00"},
            {"id": 2, "title": "正式直播", "time": "2026-01-16 19:00"},
            {"id": 3, "title": "赛后复盘", "time": "2026-01-17 10:00"}
        ]
    })

# 启动服务（适配Vercel）
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=not os.environ.get('VERCEL'))