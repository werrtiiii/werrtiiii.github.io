// snake_game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 游戏设置
let scale = 20;
let rows;
let columns;

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
    alert("游戏说明：\n" +
          "使用 W/A/S/D 控制蛇的移动\n" +
          "空格键暂停游戏\n" +
          "吃到红色食物得分\n" +
          "撞墙或撞到自己游戏结束");
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

    // 调整画布大小和比例尺适应移动端
    if (window.innerWidth <= 768) {
        canvas.width = 300;
        canvas.height = 300;
        scale = 15;
    } else {
        canvas.width = 400;
        canvas.height = 400;
        scale = 20;
    }
    
    // 重新计算行列数
    rows = canvas.height / scale;
    columns = canvas.width / scale;
    
    // 重置蛇的初始位置和食物
    snake = [{x: 5 * scale, y: 5 * scale}];
    food = spawnFood();  // 重新生成食物
    score = 0;          // 重置分数
    
    gameLoop();
}

// 定义暂停标志
let isPaused = false;

// 修改 gameLoop 函数，确保游戏暂停时停止计时器
function gameLoop() {
    if (isPaused) return;  // 如果游戏暂停，则不继续执行

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

// 监听空格键来控制暂停和恢复
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        togglePause();  // 按空格键切换暂停和继续
    }

    changeDirection(event);  // 仍然处理方向的变化
});

// 切换暂停和继续的函数
function togglePause() {
    if (isPaused) {
        isPaused = false;
        gameLoop();
        document.getElementById('pauseBtn').textContent = "暂停";
    } else {
        isPaused = true;
        clearTimeout(gameInterval);
        document.getElementById('pauseBtn').textContent = "继续";
    }
}
// 在暂停时显示提示
function displayPauseMessage() {
    if (isPaused) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("游戏暂停", canvas.width / 2 - 90, canvas.height / 2);
    }
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
    // 确保食物大小与比例尺一致
    ctx.fillRect(food.x, food.y, scale - 1, scale - 1);  // 减1是为了看到网格边界
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
    // 确保食物不会生成在蛇身上
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
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

// 添加移动端控制按钮事件监听
document.getElementById('upBtn').addEventListener('click', () => {
    if (direction !== "down") direction = "up";
});

document.getElementById('downBtn').addEventListener('click', () => {
    if (direction !== "up") direction = "down";
});

document.getElementById('leftBtn').addEventListener('click', () => {
    if (direction !== "right") direction = "left";
});

document.getElementById('rightBtn').addEventListener('click', () => {
    if (direction !== "left") direction = "right";
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    togglePause();
});

loadHighScores();
