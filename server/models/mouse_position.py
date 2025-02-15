from models.base_model import BaseEvent

class MousePosition(BaseEvent):
    x: float
    y: float