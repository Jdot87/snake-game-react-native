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
            <TouchableOpacity style={styles.button} onPress={onRestart}><Text style={styles.buttonText}>RESTART</Text></TouchableOpacity>

            {/* Quit Button with confirmation alert */}
            <TouchableOpacity style={styles.button} onPress={handleQuit}><Text style={styles.buttonText}>QUIT</Text></TouchableOpacity></View>
    );
};

// Styles for GameOver Screen
const styles = StyleSheet.create({
    // Style for the Game Over screen container
    gameOverScreen: {
        position: "absolute", // Position it absolutely over the parent component
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        zIndex: 1, // Ensure it is on top of other elements
    },
    // Style for the Game Over text
    gameOverText: {
        fontSize: 40, // Large font size
        color: "white", // White text color
        marginBottom: 20, // Margin below the text
    },
    // Style for the score text
    scoreText: {
        fontSize: 30, // Slightly smaller font size
        color: "white", // White text color
        marginBottom: 40, // Larger margin below the text
    },
    // Style for the buttons
    button: {
        backgroundColor: "#1E90FF", // DodgerBlue background color
        paddingVertical: 15, // Vertical padding
        paddingHorizontal: 40, // Horizontal padding
        borderRadius: 10, // Rounded corners
        marginVertical: 10, // Vertical margin between buttons
    },
    // Style for the text inside the buttons
    buttonText: {
        fontSize: 20, // Font size
        color: "white", // White text color
        fontWeight: "bold", // Bold text
    },
});

export default GameOver;
