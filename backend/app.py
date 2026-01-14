# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # 解决跨域

# 定义数据文件路径（向上级目录拼接）
DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")

# 接口1：获取用户数据
@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        with open(os.path.join(DATA_DIR, "users.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
        return jsonify({"code": 200, "data": data, "msg": "success"})
    except Exception as e:
        return jsonify({"code": 500, "msg": f"获取用户数据失败：{str(e)}"}), 500

# 接口2：获取直播流数据
@app.route("/api/stream", methods=["GET"])
def get_stream():
    try:
        with open(os.path.join(DATA_DIR, "stream.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
        return jsonify({"code": 200, "data": data, "msg": "success"})
    except Exception as e:
        return jsonify({"code": 500, "msg": f"获取直播流数据失败：{str(e)}"}), 500

# 接口3：获取日程数据
@app.route("/api/schedules", methods=["GET"])
def get_schedules():
    try:
        with open(os.path.join(DATA_DIR, "schedules.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
        return jsonify({"code": 200, "data": data, "msg": "success"})
    except Exception as e:
        return jsonify({"code": 500, "msg": f"获取日程数据失败：{str(e)}"}), 500

# 接口4：获取辩论数据
@app.route("/api/debate", methods=["GET"])
def get_debate():
    try:
        with open(os.path.join(DATA_DIR, "debate.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
        return jsonify({"code": 200, "data": data, "msg": "success"})
    except Exception as e:
        return jsonify({"code": 500, "msg": f"获取辩论数据失败：{str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)