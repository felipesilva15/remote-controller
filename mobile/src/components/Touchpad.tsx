import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, TapGestureHandler, State, GestureEvent, PanGestureChangeEventPayload, PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import { useSocket } from "../hooks/useSocket";
import { useMouseSocket } from "../hooks/useMouseSocket";
import { MousePosition } from "../models/mousePosition";

const { width } = Dimensions.get("window");
const TOUCHPAD_WIDTH = width * 0.9;
const TOUCHPAD_HEIGHT = 200;
const MOVEMENT_MOUSE_DELAY = 60;
const MOUSE_SENSIBILITY = 1.5;

export default function Touchpad () {
  const { moveMouseToRelativePosition, clickMouse } = useMouseSocket();
  const [ lastMovementTimestamp, setLastMovementTimestamp ] = useState(0);
  const [ lastMousePosition, setLastMousePosition ] = useState<MousePosition | null>(null);
  const lastMousePositionRef = useRef<MousePosition | null>(null);

  const handleGesture = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    const { translationX, translationY } = event.nativeEvent;

    if (translationX == 0 && translationY == 0) {
      setLastMovementTimestamp(Date.now());
      lastMousePositionRef.current = { x: 0, y: 0, timestamp: undefined };
      setLastMousePosition(lastMousePositionRef.current);
    }

    if ((Date.now() - lastMovementTimestamp) > MOVEMENT_MOUSE_DELAY) {
      const lastX = lastMousePositionRef.current?.x ?? 0;
      const lastY = lastMousePositionRef.current?.y ?? 0;

      const direction: MousePosition = {
        x: (translationX - lastX) * MOUSE_SENSIBILITY,
        y: (translationY - lastY) * MOUSE_SENSIBILITY,
        timestamp: Date.now()
      };

      moveMouseToRelativePosition(direction);

      setLastMovementTimestamp(Date.now());
      lastMousePositionRef.current = { x: translationX, y: translationY, timestamp: undefined };
      setLastMousePosition(lastMousePositionRef.current);
    }
  };

  const handleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      clickMouse();
    }
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler onHandlerStateChange={handleTap} numberOfTaps={1}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={styles.touchpad} />
        </PanGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchpad: {
    width: TOUCHPAD_WIDTH,
    height: TOUCHPAD_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
  },
});