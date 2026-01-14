# backend/test_app.py
import pytest
import json
from app import app as flask_app

@pytest.fixture
def client():
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as client:
        yield client

# 测试用户接口
def test_get_users(client):
    response = client.get('/api/users')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['code'] == 200
    assert isinstance(data['data'], list)

# 测试直播流接口
def test_get_stream(client):
    response = client.get('/api/stream')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['code'] == 200
    assert isinstance(data['data'], list)

# 测试日程接口
def test_get_schedules(client):
    response = client.get('/api/schedules')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['code'] == 200
    assert isinstance(data['data'], list)

# 测试辩论接口
def test_get_debate(client):
    response = client.get('/api/debate')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['code'] == 200
    assert isinstance(data['data'], list)