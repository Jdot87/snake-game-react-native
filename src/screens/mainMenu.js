import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";

const MainMenu = ({ navigation }) => {
    // State to manage the current color index for the title
    const [colorIndex, setColorIndex] = useState(0);
    // Array of colors to cycle through for the title
    const colors = ["pink", "yellow", "white", "#1E90FF", "black", "red"];

    // State to manage which button is highlighted
    const [highlightedButton, setHighlightedButton] = useState("PLAY");

    // Function to handle the Quit button
    const handleQuit = () => {
        Alert.alert("Quit Game", "Are you sure you want to quit?", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => console.log("Game Exited") },
        ]);
    };

    // Effect to cycle through the colors for the title at regular intervals
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
            setHighlightedButton((prev) => (prev === "PLAY" ? "QUIT" : "PLAY"));
        }, 400); // Change the interval duration as needed (400ms for button flashing)

        // Clean up the interval on component unmount
        return () => clearInterval(buttonInterval);
    }, []);

    return (
        <View style={styles.container}>

       { /* games name text*/}
         <Text style={[styles.title, { color: colors[colorIndex] }]}>Snake Game</Text>
        
       { /*adding an image*/}
        <Image
                source={require("../assets/mainMenuImage.png")} // image path (ensure you have the correct image path)
                style={styles.menuImage}
            />

            {/* Apply the current color based on the color index */}
           

            {/* Display Play Button */}
            <TouchableOpacity
                style={[
                    styles.button,
                    highlightedButton === "PLAY" && styles.highlightedButton,
                ]}
                onPress={() => navigation.navigate("Game")}
            >
                <Text style={styles.buttonText}>PLAY</Text>
            </TouchableOpacity>

            {/* Display Quit Button */}
            <TouchableOpacity
                style={[
                    styles.button,
                    highlightedButton === "QUIT" && styles.highlightedButton,
                ]}
                onPress={handleQuit}
            >
                <Text style={styles.buttonText}>QUIT</Text>
            </TouchableOpacity>

            {/* Add the image to the Main Menu */}
            
        </View>
    );
};

// Define styles for the game UI
const styles = StyleSheet.create({
    // Style for the main container
    container: {
        flex: 1, // Makes the container take up the full screen
        justifyContent: "center", // Centers content vertically
        alignItems: "center", // Centers content horizontally
        backgroundColor: "green", // Sets the background color
    },
    // Style for the title text
    title: {
        fontSize: 45, // Sets the font size to 45
        fontWeight: "bold", // Makes the font bold
        marginBottom: 40, // Adds a bottom margin of 40
    },
    // Style for the buttons
    button: {
        backgroundColor: "red", // Sets the button background color to red
        paddingVertical: 15, // Adds vertical padding of 15
        paddingHorizontal: 40, // Adds horizontal padding of 40
        borderRadius: 10, // Rounds the corners with a radius of 10
        marginVertical: 10, // Adds vertical margin of 10
    },
    // Style for the text inside the buttons
    buttonText: {
        fontSize: 20, // Sets the font size to 20
        color: "white", // Sets the text color to white
        fontWeight: "bold", // Makes the font bold
    },
    // Style for the highlighted button
    highlightedButton: {
        backgroundColor: "black", // Sets the highlighted button background color
    },
    // Style for the menu image
    menuImage: {
        width: 400,
        height: 450,      
        resizeMode: "contain", // Ensures the image is contained within the given size
    },
});

export default MainMenu;
