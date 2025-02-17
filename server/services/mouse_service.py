import pyautogui
import time
from models.mouse_event import MouseEvent
from models.mouse_position import MousePosition

class MouseService:
    def move_center():
        screen_width, screen_height = pyautogui.size()
        pyautogui.moveTo(screen_width / 2, screen_height / 2)

    def move_up(offSet: int):
        positionX, positionY = pyautogui.position()

        pyautogui.moveTo(positionX, positionY - offSet)

    def move_up(offSet: int):
        positionX, positionY = pyautogui.position()

        pyautogui.moveTo(positionX, positionY - offSet)

    def get_position():
        positionX, positionY = pyautogui.position()

        return MousePosition(x=positionX, y=positionY, timestamp=time.time())
    
    def click():
        pyautogui.click()

    def move_to(position: MousePosition):
        pyautogui.moveTo(position.x, position.y)

    def move_relative_position(position: MousePosition):
        actualPositionX, actualPositionY = pyautogui.position()

        pyautogui.moveTo(actualPositionX + position.x, actualPositionY + position.y)

    
