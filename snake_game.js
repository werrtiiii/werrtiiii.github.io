// snake_game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 游戏设置
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [{x: 5 * scale, y: 5 * scale}];
let direction = "right";
let food = spawnFood();
let score = 0;
let gameSpeed = 100; // 默认速度
let gameInterval;
let currentDifficulty = 'medium'; // 默认难度是一般

// 初始化：加载历史最高分
function loadHighScores() {
    const easyHighScore = localStorage.getItem("easyHighScore") || 0;
    const mediumHighScore = localStorage.getItem("mediumHighScore") || 0;
    const hardHighScore = localStorage.getItem("hardHighScore") || 0;
    
    document.getElementById("easyHighScore").textContent = easyHighScore;
    document.getElementById("mediumHighScore").textContent = mediumHighScore;
    document.getElementById("hardHighScore").textContent = hardHighScore;
}

// 开始游戏：根据选择的难度调整速度
function startGame(difficulty) {
    currentDifficulty = difficulty;
    document.getElementById("startScreen").style.display = "none"; // 隐藏开始界面
    document.getElementById("gameArea").style.display = "block"; // 显示游戏界面

    // 根据难度设置游戏速度
    if (difficulty === "easy") {
        gameSpeed = 150; // 简单：较慢
    } else if (difficulty === "medium") {
        gameSpeed = 100; // 一般：中等速度
    } else if (difficulty === "hard") {
        gameSpeed = 50; // 困难：较快
    }

    gameLoop();
}

// 游戏主循环
function gameLoop() {
    if (gameOver()) return;

    gameInterval = setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        moveSnake();
        drawSnake();
        updateScore();
        gameLoop();
    }, gameSpeed);
}

// 移动蛇
function moveSnake() {
    const head = Object.assign({}, snake[0]);

    if (direction === "left") head.x -= scale;
    if (direction === "right") head.x += scale;
    if (direction === "up") head.y -= scale;
    if (direction === "down") head.y += scale;

    snake.unshift(head);

    // 吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop();
    }
}

// 绘制蛇
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "white"; // 蛇头为绿色
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, scale, scale);
}

// 更改蛇的移动方向
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 65 && direction !== "right") direction = "left";  // A
    if (event.keyCode === 87 && direction !== "down") direction = "up";    // W
    if (event.keyCode === 68 && direction !== "left") direction = "right"; // D
    if (event.keyCode === 83 && direction !== "up") direction = "down";    // S
}

// 生成食物
function spawnFood() {
    const x = Math.floor(Math.random() * rows) * scale;
    const y = Math.floor(Math.random() * columns) * scale;
    return {x: x, y: y};
}

// 更新得分
function updateScore() {
    document.getElementById("score").textContent = score;
}

// 判断游戏结束
function gameOver() {
    const head = snake[0];
    
    // 撞墙
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert("游戏结束！你的得分是 " + score);
        updateHighScores(score);
        resetGame();
        return true;
    }

    // 撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert("游戏结束！你的得分是 " + score);
            updateHighScores(score);
            resetGame();
            return true;
        }
    }

    return false;
}

// 更新并保存最高分
function updateHighScores(newScore) {
    const highScores = {
        easy: localStorage.getItem("easyHighScore") || 0,
        medium: localStorage.getItem("mediumHighScore") || 0,
        hard: localStorage.getItem("hardHighScore") || 0
    };

    if (currentDifficulty === "easy" && newScore > highScores.easy) {
        localStorage.setItem("easyHighScore", newScore);
        loadHighScores();
    } else if (currentDifficulty === "medium" && newScore > highScores.medium) {
        localStorage.setItem("mediumHighScore", newScore);
        loadHighScores();
    } else if (currentDifficulty === "hard" && newScore > highScores.hard) {
        localStorage.setItem("hardHighScore", newScore);
        loadHighScores();
    }
}

// 重置游戏
function resetGame() {
    snake = [{x: 5 * scale, y: 5 * scale}];
    direction = "right";
    food = spawnFood();
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
}

loadHighScores();
