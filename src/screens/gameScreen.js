import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Define the grid size for the game board (10x10)
const GRID_SIZE = 10;

// Initial position of the snake
const INITIAL_SNAKE = [{ x: 5, y: 5 }];

// Generate a random initial position for the food
const INITIAL_FOOD = { 
    x: Math.floor(Math.random() * GRID_SIZE), 
    y: Math.floor(Math.random() * GRID_SIZE) 
};

const GameScreen = () => {
    // State variables for the snake, food, movement direction, and score
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState("RIGHT"); // Default movement direction
    const [score, setScore] = useState(0);

    // useEffect to update the snake’s movement at a set interval
    useEffect(() => {
        const interval = setInterval(moveSnake, 200); // Move the snake every 200ms
        return () => clearInterval(interval); // Clear interval on component unmount
    }, [snake, direction]);

    // Function to handle snake movement
    const moveSnake = () => {
        let newSnake = [...snake]; // Copy current snake array
        let head = { ...newSnake[0] }; // Get current head position

        // Determine movement direction and update head position
        switch (direction) {
            case "UP":
                head.y -= 1;
                break;
            case "DOWN":
                head.y += 1;
                break;
            case "LEFT":
                head.x -= 1;
                break;
            case "RIGHT":
                head.x += 1;
                break;
        }

        // Implement screen wrapping (snake reappears on opposite side)
        head.x = (head.x + GRID_SIZE) % GRID_SIZE;
        head.y = (head.y + GRID_SIZE) % GRID_SIZE;

        // Add new head to the snake body
        newSnake.unshift(head);

        // Check if the snake has eaten the food
        if (head.x === food.x && head.y === food.y) {
            // Generate new food position
            setFood({ 
                x: Math.floor(Math.random() * GRID_SIZE), 
                y: Math.floor(Math.random() * GRID_SIZE) 
            });
            // Increase score
            setScore(score + 1);
        } else {
            newSnake.pop(); // Remove the tail segment unless food is eaten
        }

        // Update the snake state
        setSnake(newSnake);
    };

    return (
        <View style={styles.container}>
            {/* Display game title */}
            <Text style={styles.title}>Snake Game</Text>
            
            {/* Display current score */}
            <Text style={styles.score}>Score: {score}</Text>

            {/* Game board where the snake and food are displayed */}
            <View style={styles.gameBoard}>
                {/* Render each segment of the snake */}
                {snake.map((segment, index) => (
                    <View
                        key={index}
                        style={[
                            styles.snakeSegment,
                            { left: segment.x * 30, top: segment.y * 30 },
                        ]}
                    />
                ))}
                {/* Render food on the board */}
                <View style={[styles.food, { left: food.x * 30, top: food.y * 30 }]} />
            </View>

            {/* Control buttons for snake movement */}
            <View style={styles.controls}>
                <TouchableOpacity onPress={() => setDirection("UP")}>
                    <Text style={styles.controlButton}>⬆️</Text>
                </TouchableOpacity>
                <View style={styles.horizontalControls}>
                    <TouchableOpacity onPress={() => setDirection("LEFT")}>
                        <Text style={styles.controlButton}>⬅️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDirection("RIGHT")}>
                        <Text style={styles.controlButton}>➡️</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setDirection("DOWN")}>
                    <Text style={styles.controlButton}>⬇️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Define styles for the game UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000", // Black background
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    score: {
        fontSize: 18,
        color: "white",
        marginBottom: 10,
    },
    gameBoard: {
        width: 300,
        height: 300,
        backgroundColor: "lightgray",
        position: "relative",
    },
    snakeSegment: {
        width: 30,
        height: 30,
        backgroundColor: "green",
        position: "absolute",
        borderRadius: 5,
    },
    food: {
        width: 30,
        height: 30,
        backgroundColor: "red",
        position: "absolute",
        borderRadius: 5,
    },
    controls: {
        marginTop: 20,
        alignItems: "center",
    },
    horizontalControls: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 100,
        marginVertical: 5,
    },
    controlButton: {
        fontSize: 40,
        color: "white",
        margin: 5,
    },
});

export default GameScreen;
