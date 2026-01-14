# backend/mock_data.py
import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")

# 确保data目录存在
os.makedirs(DATA_DIR, exist_ok=True)

# 生成用户数据
users_data = [
    {"id": 1, "name": "用户1", "avatar": "https://example.com/avatar1.jpg", "role": "viewer"},
    {"id": 2, "name": "用户2", "avatar": "https://example.com/avatar2.jpg", "role": "host"}
]

# 生成直播流数据
stream_data = [
    {"id": 1, "title": "AIGC视频制作教程", "url": "https://example.com/stream1", "status": "live"},
    {"id": 2, "title": "技术辩论直播", "url": "https://example.com/stream2", "status": "pending"}
]

# 生成日程数据
schedules_data = [
    {"id": 1, "title": "直播开播", "time": "2026-01-15 20:00", "stream_id": 1},
    {"id": 2, "title": "辩论环节", "time": "2026-01-16 19:00", "stream_id": 2}
]

# 生成辩论数据
debate_data = [
    {"id": 1, "topic": "AIGC是否会替代程序员", "pro": "支持方观点", "con": "反对方观点"},
    {"id": 2, "topic": "Python vs Java 后端选型", "pro": "Python优势", "con": "Java优势"}
]

# 写入JSON文件
with open(os.path.join(DATA_DIR, "users.json"), "w", encoding="utf-8") as f:
    json.dump(users_data, f, ensure_ascii=False, indent=2)

with open(os.path.join(DATA_DIR, "stream.json"), "w", encoding="utf-8") as f:
    json.dump(stream_data, f, ensure_ascii=False, indent=2)

with open(os.path.join(DATA_DIR, "schedules.json"), "w", encoding="utf-8") as f:
    json.dump(schedules_data, f, ensure_ascii=False, indent=2)

with open(os.path.join(DATA_DIR, "debate.json"), "w", encoding="utf-8") as f:
    json.dump(debate_data, f, ensure_ascii=False, indent=2)

print("测试数据生成完成！")