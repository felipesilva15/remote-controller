from flask_socketio import SocketIO
from models.audio_event import AudioEvent
from services.audio_service import AudioService

def register_audio_events(socketio: SocketIO):
    @socketio.on("change_master_volume")
    def change_master_volume(data):
        event = AudioEvent(**data)

        AudioService.change_volume_up(event)
