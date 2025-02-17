from flask_socketio import SocketIO
from models.mouse_event import MouseEvent
from models.mouse_position import MousePosition
from services.mouse_service import MouseService
from enums.Direction import Direction
from flask_socketio import send, emit

def register_mouse_events(socketio: SocketIO):
    @socketio.on("move_mouse")
    def move_mouse(data):
        event = MouseEvent(**data)

        match event.direction:
            case Direction.CENTER:
                MouseService.move_center()

            case Direction.UP:
                MouseService.move_up(offSet=event.direction_increment)

            case _:
                print(f"Invalid direction: {event.direction}")

    @socketio.on("move_mouse_to")
    def move_mouse_to(data: MousePosition):
        position = MousePosition(**data)

        MouseService.move_to(position)

    @socketio.on("move_mouse_relative")
    def move_mouse_to(data: MousePosition):
        position = MousePosition(**data)

        MouseService.move_relative_position(position)

    @socketio.on("get_mouse_position")
    def get_mouse_position():
        data = MouseService.get_position()
        print(data)

        socketio.emit("mouse_position", data.model_dump_json())

    @socketio.on("click_mouse")
    def click_mouse():
        MouseService.click()
