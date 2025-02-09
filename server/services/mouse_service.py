import pyautogui
from models.mouse_event import MouseEvent

class MouseService:
    def move_mouse_center():
        screen_width, screen_height = pyautogui.size()
        pyautogui.moveTo(screen_width / 2, screen_height / 2)