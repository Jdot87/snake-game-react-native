import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";

// GameOver component
const GameOver = ({ score, onRestart, onQuit }) => {
    // manage the color index for Game Over
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ["red", "white"];

    // manage which button is highlighted
    const [highlightedButton, setHighlightedButton] = useState("RESTART");

    // Function to handle Quit button with confirmation alert
    const handleQuit = () => {
        Alert.alert("Quit Game", "Are you sure you want to quit?", [
            { text: "Cancel", style: "cancel" }, // Option to cancel
            { text: "Yes", onPress: onQuit }, // Confirm quit, executes onQuit function
        ]);
    };

    // Effect to cycle through the colors for the game over text at regular intervals
    useEffect(() => {
        const colorInterval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 200); // Change the interval duration as needed (200ms for quick flashing)

        // Clean up the interval on component unmount
        return () => clearInterval(colorInterval);
    }, []);

    // Effect to toggle the highlighted button at regular intervals
    useEffect(() => {
        const buttonInterval = setInterval(() => {
            setHighlightedButton((prev) => (prev === "RESTART" ? "QUIT" : "RESTART"));
        }, 400); // Change the interval duration as needed (400ms for button flashing)

        // Clean up the interval on component unmount
        return () => clearInterval(buttonInterval);
    }, []);

    return (
        <View style={styles.gameOverScreen}>
            {/* Display Game Over message */}
            <Text style={[styles.gameOverText, { color: colors[colorIndex] }]}>GAME OVER</Text>
        <Image
                source={require("../assets/mainMenuImage.jpg")} // image path (ensure you have the correct image path)
                style={styles.menuImage}
            />
          
            {/* Display the score */}
            <Text style={styles.scoreText}>YOUR SCORE: {score}</Text>

            {/* Restart Button */}
            <TouchableOpacity
                style={[
                    styles.button,
                    highlightedButton === "RESTART" && styles.highlightedButton,
                ]}
                onPress={onRestart}
            ><Text style={styles.buttonText}>RESTART</Text></TouchableOpacity>

            {/* Quit Button with confirmation alert */}
            <TouchableOpacity
                style={[
                    styles.button,
                    highlightedButton === "QUIT" && styles.highlightedButton,
                ]}
                onPress={handleQuit}
            ><Text style={styles.buttonText}>QUIT</Text></TouchableOpacity></View>
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
        justifyContent: "top",
        fontSize: 40,
        marginBottom: 30,
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
    // Style for the highlighted button
    highlightedButton: {
        backgroundColor: "red", // Sets the highlighted button background color
    },
    menuImage: {
        width: 400,
        height: 350,      
        resizeMode: "contain", // Ensures the image is contained within the given size
    },
});

export default GameOver;
