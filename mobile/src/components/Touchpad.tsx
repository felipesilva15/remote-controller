import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, TapGestureHandler, State, GestureEvent, PanGestureChangeEventPayload, PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import { useSocket } from "../hooks/useSocket";
import { useMouseSocket } from "../hooks/useMouseSocket";
import { MousePosition } from "../models/mousePosition";

const { width } = Dimensions.get("window");
const TOUCHPAD_WIDTH = width * 0.9;
const TOUCHPAD_HEIGHT = 200;
const MOVEMENT_MOUSE_DELAY = 80;
const MOUSE_SENSIBILITY = 1.5;

export default function Touchpad () {
  const { mousePosition, getMousePosition, moveMouseTo, clickMouse } = useMouseSocket()
  const { isConnected } = useSocket();
  const [ lastMovementTimestamp, setLastMovementTimestamp ] = useState(0);

  const handleGesture = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    const { translationX, translationY } = event.nativeEvent;

    if (event.nativeEvent.state == State.END) {
      console.log("terminou");
    }

    if(translationX == 0 && translationY == 0) {
      getMousePosition();
      setLastMovementTimestamp(Date.now());
    }

    if (mousePosition && (Date.now() - lastMovementTimestamp) > MOVEMENT_MOUSE_DELAY) {
      const direction: MousePosition = {
        x: mousePosition.x + (translationX * MOUSE_SENSIBILITY),
        y: mousePosition.y + (translationY * MOUSE_SENSIBILITY),
        timestamp: Date.now()
      };

      moveMouseTo(direction);
      setLastMovementTimestamp(Date.now());
    }
  };

  const handleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      clickMouse()
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