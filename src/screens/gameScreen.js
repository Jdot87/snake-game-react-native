import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GRID_SIZE = 10; // 10x10 Grid
const INITIAL_SNAKE = [{ x: 5, y: 5 }];
const INITIAL_FOOD = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };

const GameScreen = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState("RIGHT");
    const [score, setScore] = useState(0);

    useEffect(() => {
        const interval = setInterval(moveSnake, 200);
        return () => clearInterval(interval);
    }, [snake, direction]);

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

        // Wrap Around Screen
        head.x = (head.x + GRID_SIZE) % GRID_SIZE;
        head.y = (head.y + GRID_SIZE) % GRID_SIZE;

        newSnake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
            setScore(score + 1);
        } else {
            newSnake.pop(); // Remove the tail unless eating food
        }

        setSnake(newSnake);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Snake Game</Text>
            <Text style={styles.score}>Score: {score}</Text>

            <View style={styles.gameBoard}>
                {snake.map((segment, index) => (
                    <View
                        key={index}
                        style={[
                            styles.snakeSegment,
                            { left: segment.x * 30, top: segment.y * 30 },
                        ]}
                    />
                ))}
                <View style={[styles.food, { left: food.x * 30, top: food.y * 30 }]} />
            </View>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
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

