import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { Direction } from "../enums/directions";

export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const moveMouse = (direction: Direction) => {
    socket.emit("move_mouse", {
      direction: direction,
      timestamp: Date.now()
    });
  };

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return { isConnected, moveMouse };
}
