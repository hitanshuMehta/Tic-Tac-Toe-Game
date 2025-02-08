import React, { useRef, useState } from 'react';
import confetti from 'canvas-confetti'; // 🎉 Import confetti library
import './Tictactoe.css';
import circle_icon from '../assets/Circle.png';
import cross_icon from '../assets/Cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const Tictactoe = () => {
  let [count, setcount] = useState(0);
  let [lock, setlock] = useState(false);
  let titleref = useRef(null);

  // 🎉 Function to trigger confetti animation
  const triggerConfetti = () => {
    confetti({
      particleCount: 500,  // Number of confetti pieces
      spread: 100,         // Spread angle
      origin: { y: 0.6 },  // Start position
    });
  };

  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return; // Prevents modifying already filled boxes or playing when locked
    }

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' />`; // Properly closed img tag
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' />`;
      data[num] = "o";
    }

    setcount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    let winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
      let [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setlock(true); // Lock the game on win

        // 🏆 Show winning message
        if (data[a] === "x") {
          titleref.current.innerHTML = `🎉 Congratulations! <img src=${cross_icon}> wins! 🎉`;
        } else {
          titleref.current.innerHTML = `🎉 Congratulations! <img src=${circle_icon}> wins! 🎉`;
        }
        titleref.current.style.color = '#26ffbc';
        
        triggerConfetti(); // 🎉 Trigger confetti on win
        return;
      }
    }

    // Check for draw if all boxes are filled
    if (!data.includes("") && !lock) {
      titleref.current.innerHTML = "🤝 It's a Draw!";
      titleref.current.style.color = '#26ffbc';
      setlock(true);
    }
  };

  // Reset function
  const resetGame = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    setcount(0);
    setlock(false);

    // Clear the board
    document.querySelectorAll(".boxes").forEach((box) => {
      box.innerHTML = "";
    });

    // Reset the title
    if (titleref.current) {
      titleref.current.innerHTML = "";
      titleref.current.style.color = "";
    }
  };

  return (
    <div className='container'>
      <h1 className="title">Tic Tac Toe Game in <span>React</span></h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>

        <div className="row2">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>

        <div className="row3">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <h3 className="title" ref={titleref}></h3>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Tictactoe;
