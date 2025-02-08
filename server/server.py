from flask import Flask
from flask_socketio import SocketIO
import pyautogui

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("move_mouse_center")
def move_mouse_center():
    screen_width, screen_height = pyautogui.size()
    pyautogui.moveTo(screen_width / 2, screen_height / 2)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)