import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { Direction } from "../enums/directions";

export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

  const moveMouse = (direction: Direction) => {
    socket.emit("move_mouse", {
      direction: direction,
      timestamp: Date.now()
    });
  };

  const getMousePosition = () => {
    socket.emit("get_mouse_position");
  }

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("mouse_position", (position: any) => {
      setMousePosition(JSON.parse(position))
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return { isConnected, mousePosition, moveMouse, getMousePosition };
}
