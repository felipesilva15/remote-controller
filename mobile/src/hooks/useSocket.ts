import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { Direction } from "../enums/directions";
import { MousePosition } from "../models/mousePosition";

export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null)

  const emitEvent = (event: string, data: any = undefined, callback?: Function) => {
    if (data) {
      socket.emit(event, data);
    } else {
      socket.emit(event);
    }
  };

  const listenEvent = (event: string, callback: Function) => {
    socket.on(event, callback);
  };

  const removeEventListener = (event: string, callback?: Function) => {
    socket.off(event);
  };

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

  return { isConnected, mousePosition, listenEvent, emitEvent, removeEventListener };
}
