import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, GestureHandlerRootView, GestureDetector, Gesture, TapGestureHandler, State } from "react-native-gesture-handler";
import { useSocket } from "../hooks/useSocket";

const { width } = Dimensions.get("window");
const TOUCHPAD_WIDTH = width * 0.9;
const TOUCHPAD_HEIGHT = 200;

export default function Touchpad () {
  const {isConnected, mousePosition, getMousePosition} = useSocket()

  const handleGesture = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;

    if(translationX == 0 && translationY == 0) {
      getMousePosition()
    }
  };

  const handleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("Clicked!");
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