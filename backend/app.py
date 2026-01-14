# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# 适配Vercel环境的路径配置
if os.environ.get("VERCEL"):
    # Vercel环境下，根目录为项目根目录
    DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")
else:
    # 本地环境路径
    DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")

# 确保数据目录存在（Vercel只读，需提前上传数据文件）
os.makedirs(DATA_DIR, exist_ok=True)

# 接口逻辑保持不变（后续接口代码省略，沿用之前的即可）
@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        with open(os.path.join(DATA_DIR, "users.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
        return jsonify({"code": 200, "data": data, "msg": "success"})
    except Exception as e:
        return jsonify({"code": 500, "msg": f"获取用户数据失败：{str(e)}"}), 500

# 其他接口（stream/schedules/debate）保持不变

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)