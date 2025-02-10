// src/gameLogic/snake.js
export const moveSnake = (snake, direction) => {
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

    newSnake.unshift(head);
    newSnake.pop();
    return newSnake;
};

