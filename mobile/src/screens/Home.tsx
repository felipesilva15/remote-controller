import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useSocket } from "../hooks/useSocket";
import { Direction } from "../enums/directions";
import Touchpad from "../components/Touchpad";
import { useMouseSocket } from "../hooks/useMouseSocket";

export default function Home() {
    const { moveMouse } = useMouseSocket();
    const { isConnected } = useSocket();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Status: {isConnected ? "Conectado" : "Desconectado"}
            </Text>
            <Button title="Mover mouse para o centro" onPress={() => moveMouse(Direction.CENTER)} />
            <Touchpad />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    text: {
        fontSize: 18, 
        marginBottom: 10 
    },
});