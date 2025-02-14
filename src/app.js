import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import your screens
import MainMenu from "./src/screens/mainMenu"; // Import Main Menu screen
import GameScreen from "./src/screens/gameScreen"; // Import Game Screen

// Create a stack navigator
const Stack = createStackNavigator();

// Main app component with navigation
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainMenu" component={MainMenu} />
                <Stack.Screen name="Game" component={GameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
