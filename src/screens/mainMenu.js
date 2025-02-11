import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const MainMenu = ({ navigation }) => {
    // Function to handle the Quit button
    const handleQuit = () => {
        Alert.alert("Quit Game", "Are you sure you want to quit?", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => console.log("Game Exited") },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Snake Game</Text>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Game")}>
                <Text style={styles.buttonText}>PLAY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleQuit}>
                <Text style={styles.buttonText}>QUIT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
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

export default MainMenu;
