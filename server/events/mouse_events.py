from flask_socketio import SocketIO
from models.mouse_event import MouseEvent
from services.mouse_service import MouseService

def register_mouse_events(socketio: SocketIO):
    @socketio.on("move_mouse")
    def move_mouse(data):
        event = MouseEvent(**data)

        match event.direction:
            case "center":
                MouseService.move_mouse_center()
            case _:
                print(f"Invalid direction: {event.direction}")
