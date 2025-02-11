import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Importing NavigationContainer to handle navigation
import { createStackNavigator } from "@react-navigation/stack"; // Importing Stack Navigator to manage screen transitions
import MainMenu from "./src/screens/MainMenu"; // Importing the Main Menu screen
import GameScreen from "./src/screens/GameScreen"; // Importing the Game Screen

const Stack = createStackNavigator(); // Creating the stack navigator

export default function App() {
    return (
        <NavigationContainer> 
            {/* Wrapping the navigation structure inside NavigationContainer */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Defining a Stack Navigator and hiding the header for cleaner UI */}
                <Stack.Screen name="MainMenu" component={MainMenu} />
                {/* Defining the Main Menu screen */}
                <Stack.Screen name="Game" component={GameScreen} />
                {/* Defining the Game Screen */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
