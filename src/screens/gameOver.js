import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

// GameOver component
const GameOver = ({ score, onRestart, onQuit }) => {

    // Function to handle Quit button with confirmation alert
    const handleQuit = () => {
        Alert.alert("Quit Game", "Are you sure you want to quit?", [
            { text: "Cancel", style: "cancel" }, // Option to cancel
            { text: "Yes", onPress: onQuit }, // Confirm quit, executes onQuit function
        ]);
    };

    return (
        <View style={styles.gameOverScreen}>
            {/* Display Game Over message */}
            <Text style={styles.gameOverText}>GAME OVER</Text>

            {/* Display the score */}
            <Text style={styles.scoreText}>YOUR SCORE: {score}</Text>

            {/* Restart Button */}
            <TouchableOpacity style={styles.button} onPress={onRestart}>
                <Text style={styles.buttonText}>RESTART</Text>
            </TouchableOpacity>

            {/* Quit Button with confirmation alert */}
            <TouchableOpacity style={styles.button} onPress={handleQuit}>
                <Text style={styles.buttonText}>QUIT</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles for GameOver Screen
const styles = StyleSheet.create({
    gameOverScreen: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    gameOverText: {
        fontSize: 40,
        color: "white",
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 30,
        color: "white",
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#1E90FF",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
});

export default GameOver;
