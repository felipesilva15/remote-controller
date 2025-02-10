from models.base_model import BaseEvent
from enums.Direction import Direction

class MouseEvent(BaseEvent):
    direction: Direction