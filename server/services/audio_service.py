from models.audio_event import AudioEvent

class AudioService:
    def change_volume_up(data: AudioEvent):
        print(f"Volume aumentado! {data.change_direction} - Timestamp: {data.timestamp}")