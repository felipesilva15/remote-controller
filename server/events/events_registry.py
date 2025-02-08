from flask_socketio import SocketIO
from events.audio_events import register_audio_events

def register_events(socketio: SocketIO):
    register_audio_events(socketio)