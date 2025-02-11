import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

// MainMenu component that serves as the game's main menu screen
const MainMenu = ({ navigation }) => {
    
    // Function to handle the Quit button
    const handleQuit = () => {
        Alert.alert(
            "Quit Game", 
            "Are you sure you want to quit?", 
            [
                { text: "Cancel", style: "cancel" }, // Cancel option to dismiss alert
                { text: "Yes", onPress: () => console.log("Game Exited") }, // Confirm exit action
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Display game title */}
            <Text style={styles.title}>Snake Game</Text>
            
            {/* Button to start the game, navigates to the Game screen */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Game")}>
                <Text style={styles.buttonText}>PLAY</Text>
            </TouchableOpacity>

            {/* Button to quit the game, triggers confirmation alert */}
            <TouchableOpacity style={styles.button} onPress={handleQuit}>
                <Text style={styles.buttonText}>QUIT</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles for the MainMenu component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000", // Black background for a game-like feel
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        marginBottom: 40, // Space between title and buttons
    },
    button: {
        backgroundColor: "#1E90FF", // Blue color for buttons
        paddingVertical: 15, // Vertical padding for better touch area
        paddingHorizontal: 40, // Horizontal padding for button width
        borderRadius: 10, // Rounded corners
        marginVertical: 10, // Spacing between buttons
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
});

// Export the MainMenu component for use in the app
export default MainMenu;
