document.addEventListener('DOMContentLoaded', () => {

  //  const previousShape = document.querySelectorAll(.previous-grid div)
    const grid = document.querySelector('.grid');
    const GRID_WIDTH = 10;
    const GRID_HEIGHT = 20;
    const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;
    let currentPosition = 4;
    let squares = Array.from(grid.querySelectorAll('div'));
    let nextRandom = 0;

    const colors = [
      'url(images/blue_block.png)',
      'url(images/pink_block.png)',
      'url(images/purple_block.png)',
      'url(images/peach_block.png)',
      'url(images/yellow_block.png)'
    ]

    // The kind of blocks

    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
      ]
    
      const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
      ]
    
      const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
      ]
    
      const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
      ]
    
      const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
      ]

      const thetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

      let random = Math.floor(Math.random() * thetrominoes.length);
      let currentRotation = 0;
      let current = thetrominoes[random][currentRotation];

      function control(event) {
        if (event.keyCode === 39) {
          moveRight();
        } else if (event.keyCode === 38) {
          rotate();
        } else if (event.keyCode === 37) {
          moveLeft();
        } else if (event.keyCode === 40) {
          moveDown();
        }
      }

      document.addEventListener('keyup', control);

      function draw() {
        current.forEach((index) => {
          squares[currentPosition + index].classList.add('block');
        })
      }

      function undraw() {
        current.forEach((index) => {
          squares[currentPosition + index].classList.remove('block');
        })
      }
    
      function moveDown() {
        undraw();
        currentPosition +=  GRID_WIDTH;
        draw();
        freeze();
      }

      function moveRight() {
        undraw();
        const isAtRangeEdge = current.some((index) => (currentPosition + index) % GRID_WIDTH === GRID_WIDTH - 1); 
        
        if (!isAtRangeEdge) {
          currentPosition += 1;
        }

        if (current.some((index) => squares[currentPosition + index].classList.add('block'))) {
          currentPosition -= 1;
        }
        draw();
      }

      function moveLeft() {
        undraw()

        const isAtLeftEdge = current.some((index) => (currentPosition + index) % GRID_WIDTH === 0)

        if (!isAtLeftEdge) {
          currentPosition -= 1
        }
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
          currentPosition += 1
        }

        draw()
      }

      function rotate() {
        undraw();
        currentRotation++;

        if (currentRotation === current.length) {
          currentRotation = 0;
        }
        current = thetrominoes[random][currentRotation];
        draw();
      }

      const displayWidth = 4;
      const displayIndex = 0;

      const displaySquares = document.querySelectorAll('.previous-grid div')
      
      const smallTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
        [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
        [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
     ]

     
    function displayShape() {
      displaySquares.forEach(square => {
        square.classList.remove('block')
        square.style.backgroundImage = 'none'
      })
      smallTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('block')
       // displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
      })
    }

    function freeze() {
      if (current.some(index => squares[currentPosition + index + GRID_WIDTH].classList.contains('block3')
      || squares[currentPosition + index + GRID_WIDTH].classList.contains('block2r') )) {
        current.forEach((index) => squares[index + currentPosition].classList.add('block2'))
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * thetrominoes);
        currentPosition = 4;
        draw();
        displayShape();
      } 
    }
      draw();
      //displayShape();
      setInterval(moveDown, 50);

})