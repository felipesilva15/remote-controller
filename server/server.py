from flask import Flask
from flask_socketio import SocketIO
from config import Config
from events.events_registry import register_events
import pyautogui

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

register_events(socketio)

if __name__ == "__main__":
    socketio.run(app, host=Config.SOCKET_HOST, port=Config.SOCKET_PORT, debug=Config.APP_DEBUG)