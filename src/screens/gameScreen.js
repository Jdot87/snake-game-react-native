import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import GameOver from './gameOver';

const { width } = Dimensions.get('window'); 
const GRID_SIZE = 14;
const CELL_SIZE = width * 0.08;
const BOARD_SIZE = CELL_SIZE * GRID_SIZE;
const INITIAL_SNAKE = [{ x: 5, y: 5 }];
const INITIAL_FOOD = {
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
};

const GameScreen = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState('RIGHT');
  const [prevDirection, setPrevDirection] = useState('RIGHT'); // Track last valid direction
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  const moveSnake = () => {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Check if snake collides with itself
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      return;
    }

    // Check for wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      });
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    setPrevDirection(direction);
  };

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setScore(0);
    setGameOver(false);
    setDirection('RIGHT');
    setPrevDirection('RIGHT');
  };

  const quitGame = () => {
    console.log('Game Exited');
  };

  // Prevents reversing onto itself
  const changeDirection = (newDirection) => {
    if (
      (newDirection === 'UP' && prevDirection !== 'DOWN') ||
      (newDirection === 'DOWN' && prevDirection !== 'UP') ||
      (newDirection === 'LEFT' && prevDirection !== 'RIGHT') ||
      (newDirection === 'RIGHT' && prevDirection !== 'LEFT')
    ) {
      setDirection(newDirection);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snake Game</Text>
      <Text style={styles.score}>Score: {score}</Text>

      {gameOver && <GameOver score={score} onRestart={restartGame} onQuit={quitGame} />}

      {!gameOver && (
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
      )}

      {!gameOver && (
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={() => changeDirection('UP')}>
            <Text style={styles.buttonText}>Up</Text>
          </TouchableOpacity>
          <View style={styles.horizontalControls}>
            <TouchableOpacity style={styles.button} onPress={() => changeDirection('LEFT')}>
              <Text style={styles.buttonText}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => changeDirection('RIGHT')}>
              <Text style={styles.buttonText}>Right</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => changeDirection('DOWN')}>
            <Text style={styles.buttonText}>Down</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  score: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  gameBoard: {
    width: 400,
    height: 450,
    backgroundColor: 'lightgray',
    position: 'relative',
    marginVertical: 20,
  },
  snakeSegment: {
    width: 30,
    height: 30,
    backgroundColor: 'green',
    position: 'absolute',
    borderRadius: 5,
  },
  food: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 5,
  },
  controls: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#333',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 30,
  },
  horizontalControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#555',
    padding: 20,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GameScreen;
