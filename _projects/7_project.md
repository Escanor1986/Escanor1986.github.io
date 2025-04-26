---
layout: page
title: Connect 4 - OOP Game
description: Connect 4 game developed with TypeScript
img: assets/img/connect4.png
importance: 1
category: fun
giscus_comments: true
---

## Links & Resources

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Source Code</h5>
        <p class="card-text">Check out the complete source code and documentation on GitHub.</p>
        <a href="https://github.com/Escanor1986/Intermediate_JavaScript/tree/main/Classe_ES6/connect_four_OO/connect4_oo" target="_blank" class="btn btn-primary">
          <i class="fab fa-github"></i> View Repository
        </a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Live Demo</h5>
        <p class="card-text">Experience the application in action through the live deployment.</p>
        <a href="https://escanor1986.github.io/Intermediate_JavaScript/" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Launch Application
        </a>
      </div>
    </div>
  </div>
</div>

## Description

Connect 4 game developed with TypeScript using object-oriented programming, offering an interactive experience in the browser with a well-structured architecture.

This web implementation of the classic board game demonstrates the practical application of object-oriented programming concepts.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/connect4.png" title="Connect 4 Game" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Interface of the Connect 4 game, showing the game board with colored tokens and the user interface.
</div>

The project implements a well-structured OOP architecture with several main classes such as Game, Board, Player, and UI, each with specific responsibilities. The fundamental principles of object-oriented programming are rigorously applied:

- **Encapsulation** with well-defined private properties and public methods
- **Inheritance** forming a class hierarchy for game elements
- **Polymorphism** allowing specific behaviors for different types of elements
- **Composition** assembling objects to create complex functionalities

The game offers a complete experience with several features:

- **Classic rules** of Connect 4 faithfully implemented
- **Victory detection** in all directions (horizontal, vertical, diagonal)
- **Color selection** for player tokens
- **Responsive design** adapted to all devices

The development of this game presented several interesting technical challenges, notably the implementation of an efficient victory detection algorithm and the creation of a modular and reusable TypeScript architecture.

SOLID principles were applied throughout development to ensure a maintainable and evolving code base, facilitating the addition of future features such as an online multiplayer mode or advanced AI.

{% raw %}

```typescript
// Extract from the Game class showing victory detection logic
export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number = 0;
  private gameState: GameState = GameState.PLAYING;
  private winningCells: Cell[] = [];
  
  constructor(
    private readonly rows: number = 6,
    private readonly columns: number = 7,
    private readonly connectToWin: number = 4,
    private readonly ui: UI
  ) {
    this.board = new Board(rows, columns);
    this.players = [
      new Player('Player 1', 'red'),
      new Player('Player 2', 'yellow')
    ];
    
    this.ui.drawBoard(this.board);
    this.ui.updateStatus(`${this.currentPlayer.name}'s turn`);
    this.setupEventListeners();
  }
  
  public get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
  
  private nextTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.ui.updateStatus(`${this.currentPlayer.name}'s turn`);
  }
  
  public dropToken(columnIndex: number): void {
    if (this.gameState !== GameState.PLAYING) return;
    
    const rowIndex = this.board.findAvailableRow(columnIndex);
    if (rowIndex === -1) return; // Column full
    
    const cell = this.board.getCell(rowIndex, columnIndex);
    cell.player = this.currentPlayer;
    
    this.ui.updateCell(cell);
    this.ui.animateDropToken(columnIndex, rowIndex, this.currentPlayer.color);
    
    if (this.checkWin(rowIndex, columnIndex)) {
      this.gameState = GameState.WON;
      this.ui.highlightWinningCells(this.winningCells);
      this.ui.updateStatus(`${this.currentPlayer.name} wins!`);
    } else if (this.board.isFull()) {
      this.gameState = GameState.DRAW;
      this.ui.updateStatus('Draw!');
    } else {
      this.nextTurn();
    }
  }
  
  private checkWin(row: number, col: number): boolean {
    // Direction arrays (vertical, horizontal, diagonals)
    const directions = [
      [1, 0], [0, 1], [1, 1], [1, -1]
    ];
    
    for (const [dRow, dCol] of directions) {
      const line = this.findLine(row, col, dRow, dCol);
      if (line.length >= this.connectToWin) {
        this.winningCells = line;
        return true;
      }
    }
    
    return false;
  }
  
  private findLine(row: number, col: number, dRow: number, dCol: number): Cell[] {
    const player = this.currentPlayer;
    const line: Cell[] = [];
    
    // Search in positive direction
    let r = row, c = col;
    while (
      r >= 0 && r < this.rows && 
      c >= 0 && c < this.columns &&
      this.board.getCell(r, c).player === player
    ) {
      line.push(this.board.getCell(r, c));
      r += dRow;
      c += dCol;
    }
    
    // Search in negative direction
    r = row - dRow;
    c = col - dCol;
    while (
      r >= 0 && r < this.rows && 
      c >= 0 && c < this.columns &&
      this.board.getCell(r, c).player === player
    ) {
      line.push(this.board.getCell(r, c));
      r -= dRow;
      c -= dCol;
    }
    
    return line;
  }
  
  // Other Game class methods...
}
```

{% endraw %}
