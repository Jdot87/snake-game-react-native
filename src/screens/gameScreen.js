import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const GRID_SIZE = 10; // 10x10 Grid
const INITIAL_SNAKE = [{ x: 5, y: 5 }];
const INITIAL_FOOD = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };

const GameScreen = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState("RIGHT");
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false); // Game over state

    useEffect(() => {
        // Stop the game if it’s over
        if (gameOver) return;

        const interval = setInterval(moveSnake, 200); // Move snake every 200ms
        return () => clearInterval(interval);
    }, [snake, direction, gameOver]);

    // Function to handle snake movement
    const moveSnake = () => {
        let newSnake = [...snake];
        let head = { ...newSnake[0] };

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

        // Check for boundary collision (Game over if snake hits the wall)
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            setGameOver(true); // End the game if snake hits the wall
            return;
        }

        newSnake.unshift(head);

        // Check if the snake has eaten food
        if (head.x === food.x && head.y === food.y) {
            // Generate new food position
            setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
            // Increase score
            setScore(score + 1);
        } else {
            newSnake.pop(); // Remove the tail unless food is eaten
        }

        // Update the snake state
        setSnake(newSnake);
    };

    // Function to handle game restart
    const restartGame = () => {
        setSnake(INITIAL_SNAKE); // Reset the snake
        setFood(INITIAL_FOOD); // Reset food
        setScore(0); // Reset score
        setGameOver(false); // Reset game over state
    };

    return (
        <View style={styles.container}>
            {/* Display game title */}
            <Text style={styles.title}>Snake Game</Text>
            
            {/* Display current score */}
            <Text style={styles.score}>Score: {score}</Text>

            {/* Game over screen */}
            {gameOver && (
                <View style={styles.gameOverScreen}>
                    <Text style={styles.gameOverText}>Game Over</Text>
                    <TouchableOpacity style={styles.button} onPress={restartGame}>
                        <Text style={styles.buttonText}>Restart</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Game board where the snake and food are displayed */}
            {!gameOver && (
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
            )}

            {/* Control buttons for snake movement */}
            {!gameOver && (
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.button} onPress={() => setDirection("UP")}>
                        <Text style={styles.buttonText}>Up</Text>
                    </TouchableOpacity>
                    <View style={styles.horizontalControls}>
                        <TouchableOpacity style={styles.button} onPress={() => setDirection("LEFT")}>
                            <Text style={styles.buttonText}>Left</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setDirection("RIGHT")}>
                            <Text style={styles.buttonText}>Right</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => setDirection("DOWN")}>
                        <Text style={styles.buttonText}>Down</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

// Define styles for the game UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green", // Black background
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
    button: {
        padding: 10,
        backgroundColor: "#1E90FF", // Blue color for buttons
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    gameOverScreen: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -150 }, { translateY: -50 }],
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    gameOverText: {
        fontSize: 24,
        color: "white",
        marginBottom: 20,
    },
});

export default GameScreen;
