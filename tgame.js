{\rtf1\ansi\ansicpg1252\cocoartf2578
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Tetris\
// Part 1: Setting up the basic structure and rainbow-colored blocks\
\
const canvasWidth = 800;\
const canvasHeight = 600;\
const blockWidth = 40;\
const gridWidth = canvasWidth / blockWidth;\
const gridHeight = canvasHeight / blockWidth;\
\
let blockGrid;\
\
function setup() \{\
  createCanvas(canvasWidth, canvasHeight);\
  blockGrid = createEmptyGrid();\
\}\
\
function draw() \{\
  background(0);\
  displayGrid();\
\}\
\
function createEmptyGrid() \{\
  const grid = [];\
  for (let i = 0; i < gridWidth; i++) \{\
    const row = [];\
    for (let j = 0; j < gridHeight; j++) \{\
      row.push(null);\
    \}\
    grid.push(row);\
  \}\
  return grid;\
\}\
\
function displayGrid() \{\
  for (let i = 0; i < gridWidth; i++) \{\
    for (let j = 0; j < gridHeight; j++) \{\
      if (blockGrid[i][j]) \{\
        blockGrid[i][j].display(i * blockWidth, j * blockWidth);\
      \}\
    \}\
  \}\
\}\
\
class Block \{\
  constructor(color) \{\
    this.color = color;\
  \}\
\
  display(x, y) \{\
    fill(this.color);\
    stroke(0);\
    rect(x, y, blockWidth, blockWidth);\
  \}\
\}\
\
function rainbowColor(index) \{\
  return color('hsl(' + (index * 360 / 7) + ', 100%, 50%)');\
\}\
// Tetris\
// Part 2: Tetris shapes, rotations, and arrow key controls\
\
const shapes = [\
  // I shape\
  [\
    [\
      [1, 1, 1, 1]\
    ],\
    [\
      [1],\
      [1],\
      [1],\
      [1]\
    ]\
  ],\
  // J shape\
  [\
    [\
      [1, 0, 0],\
      [1, 1, 1]\
    ],\
    [\
      [1, 1],\
      [1, 0],\
      [1, 0]\
    ],\
    [\
      [1, 1, 1],\
      [0, 0, 1]\
    ],\
    [\
      [0, 1],\
      [0, 1],\
      [1, 1]\
    ]\
  ],\
  // L shape\
  [\
    [\
      [0, 0, 1],\
      [1, 1, 1]\
    ],\
    [\
      [1, 0],\
      [1, 0],\
      [1, 1]\
    ],\
    [\
      [1, 1, 1],\
      [1, 0, 0]\
    ],\
    [\
      [1, 1],\
      [0, 1],\
      [0, 1]\
    ]\
  ],\
  // O shape\
  [\
    [\
      [1, 1],\
      [1, 1]\
    ]\
  ],\
  // S shape\
  [\
    [\
      [0, 1, 1],\
      [1, 1, 0]\
    ],\
    [\
      [1, 0],\
      [1, 1],\
      [0, 1]\
    ]\
  ],\
  // T shape\
  [\
    [\
      [0, 1, 0],\
      [1, 1, 1]\
    ],\
    [\
      [1, 0],\
      [1, 1],\
      [1, 0]\
    ],\
    [\
      [1, 1, 1],\
      [0, 1, 0]\
    ],\
    [\
      [0, 1],\
      [1, 1],\
      [0, 1]\
    ]\
  ],\
  // Z shape\
  [\
    [\
      [1, 1, 0],\
      [0, 1, 1]\
    ],\
    [\
      [0, 1],\
      [1, 1],\
      [1, 0]\
    ]\
  ]\
];\
\
class Tetromino \{\
  constructor(shapeIndex, posX, posY) \{\
    this.shapeIndex = shapeIndex;\
    this.rotationIndex = 0;\
    this.posX = posX;\
    this.posY = posY;\
    this.color = rainbowColor(shapeIndex);\
  \}\
\
  display() \{\
    const shape = shapes[this.shapeIndex][this.rotationIndex];\
    for (let i = 0; i < shape.length; i++) \{\
      for (let j = 0; j < shape[i].length; j++) \{\
        if (shape[i][j]) \{\
          const block = new Block(this.color);\
          block.display((this.posX + i) * blockWidth, (this.posY + j) * blockWidth);\
        \}\
      \}\
    \}\
  \}\
\}\
\
let currentTetromino;\
\
function setup() \{\
  createCanvas(canvasWidth, canvasHeight);\
  blockGrid = createEmptyGrid();\
  currentTetromino = new\
Tetromino(floor(random(shapes.length)), floor(gridWidth / 2) - 2, 0);\
\}\
\
function draw() \{\
background(0);\
displayGrid();\
currentTetromino.display();\
\}\
\
function keyPressed() \{\
if (keyCode === LEFT_ARROW) \{\
currentTetromino.posX--;\
\} else if (keyCode === RIGHT_ARROW) \{\
currentTetromino.posX++;\
\} else if (keyCode === UP_ARROW) \{\
currentTetromino.rotationIndex++;\
if (currentTetromino.rotationIndex >= shapes[currentTetromino.shapeIndex].length) \{\
currentTetromino.rotationIndex = 0;\
\}\
\} else if (keyCode === DOWN_ARROW) \{\
currentTetromino.posY++;\
\}\
\}\
// Tetris\
// Part 3: Collision detection, line clearing, and shape spawning\
\
function validMove(tetromino) \{\
  const shape = shapes[tetromino.shapeIndex][tetromino.rotationIndex];\
  for (let i = 0; i < shape.length; i++) \{\
    for (let j = 0; j < shape[i].length; j++) \{\
      if (shape[i][j]) \{\
        const x = tetromino.posX + i;\
        const y = tetromino.posY + j;\
\
        if (x < 0 || x >= gridWidth || y >= gridHeight) \{\
          return false;\
        \}\
\
        if (blockGrid[x][y]) \{\
          return false;\
        \}\
      \}\
    \}\
  \}\
  return true;\
\}\
\
function lockTetromino(tetromino) \{\
  const shape = shapes[tetromino.shapeIndex][tetromino.rotationIndex];\
  for (let i = 0; i < shape.length; i++) \{\
    for (let j = 0; j < shape[i].length; j++) \{\
      if (shape[i][j]) \{\
        const x = tetromino.posX + i;\
        const y = tetromino.posY + j;\
        blockGrid[x][y] = new Block(tetromino.color);\
      \}\
    \}\
  \}\
\}\
\
function clearLines() \{\
  let linesCleared = 0;\
  for (let j = gridHeight - 1; j >= 0; j--) \{\
    let lineComplete = true;\
    for (let i = 0; i < gridWidth; i++) \{\
      if (!blockGrid[i][j]) \{\
        lineComplete = false;\
        break;\
      \}\
    \}\
    if (lineComplete) \{\
      for (let k = j; k > 0; k--) \{\
        for (let i = 0; i < gridWidth; i++) \{\
          blockGrid[i][k] = blockGrid[i][k - 1];\
        \}\
      \}\
      linesCleared++;\
      j++; // Recheck the current line\
    \}\
  \}\
  return linesCleared;\
\}\
\
function spawnNewTetromino() \{\
  currentTetromino = new Tetromino(floor(random(shapes.length)), floor(gridWidth / 2) - 2, 0);\
  if (!validMove(currentTetromino)) \{\
    noLoop(); // Game over\
  \}\
\}\
\
function keyPressed() \{\
  const newTetromino = new Tetromino(\
    currentTetromino.shapeIndex,\
    currentTetromino.posX,\
    currentTetromino.posY\
  );\
  newTetromino.rotationIndex = currentTetromino.rotationIndex;\
\
  if (keyCode === LEFT_ARROW) \{\
    newTetromino.posX--;\
  \} else if (keyCode === RIGHT_ARROW) \{\
    newTetromino.posX++;\
  \} else if (keyCode === UP_ARROW) \{\
    newTetromino.rotationIndex++;\
    if (newTetromino.rotationIndex >= shapes[newTetromino.shapeIndex].length) \{\
      newTetromino.rotationIndex = 0;\
    \}\
  \} else if (keyCode === DOWN_ARROW) \{\
    newTetromino.posY++;\
  \}\
\
  if (validMove(newTetromino)) \{\
    currentTetromino = newTetromino;\
  \}\
\}\
\
function draw() \{\
 \
background(0);\
displayGrid();\
currentTetromino.display();\
\
if (frameCount % 10 === 0) \{ // Move the shape down every 10 frames\
const newTetromino = new Tetromino(\
currentTetromino.shapeIndex,\
currentTetromino.posX,\
currentTetromino.posY + 1\
);\
newTetromino.rotationIndex = currentTetromino.rotationIndex;\
	if (validMove(newTetromino)) \{\
  currentTetromino = newTetromino;\
\} else \{\
  lockTetromino(currentTetromino);\
  clearLines();\
  spawnNewTetromino();\
\}\
\}\
\}\
\
function setup() \{\
createCanvas(canvasWidth, canvasHeight);\
blockGrid = createEmptyGrid();\
spawnNewTetromino();\
\}\
\
}