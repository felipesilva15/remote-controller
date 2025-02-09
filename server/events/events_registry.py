from flask_socketio import SocketIO
from events.audio_events import register_audio_events
from events.mouse_events import register_mouse_events

def register_events(socketio: SocketIO):
    register_audio_events(socketio)
    register_mouse_events(socketio)