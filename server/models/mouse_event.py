from models.base_model import BaseEvent

class MouseEvent(BaseEvent):
    direction: str
    direction_increment: int