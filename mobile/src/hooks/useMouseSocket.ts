import { MousePosition } from './../models/mousePosition';
import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { Direction } from "../enums/directions";
import { useSocket } from "./useSocket";

export function useMouseSocket() {
  const {listenEvent, emitEvent, removeEventListener} = useSocket();
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);

  const moveMouse = (direction: Direction) => {
    emitEvent("move_mouse", {
      direction: direction,
      direction_increment: 0,
      timestamp: Date.now()
    });
  };

  const moveMouseTo = (mousePosition: MousePosition) => {
    emitEvent("move_mouse_to", mousePosition);
  };

  const getMousePosition = () => {
    emitEvent("get_mouse_position");
  }

  const moveMouseToRelativePosition = (mousePosition: MousePosition) => {
    emitEvent("move_mouse_to_relative_position", mousePosition);
  }

  const clickMouse = () => {
    emitEvent("click_mouse");
  }

  useEffect(() => {
    listenEvent("mouse_position", (jsonPosition: string) => {
      setMousePosition(JSON.parse(jsonPosition));
    });

    return () => {
      removeEventListener("mouse_position");
    };
  }, []);

  return { mousePosition, moveMouse, moveMouseTo, getMousePosition, clickMouse, moveMouseToRelativePosition };
}
