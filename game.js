import React, { useState, useRef, useEffect } from "react";

export function Game() {
  
  let time = 120; 
  let minutes = 2;
  let seconds;  

  const countDown = () => {
    setInterval(()=> 
    {
      
      if(time > 0){
        time -= 1; 
        minutes = Math.floor(time / 60); 
        seconds = time % 60; 
  
        console.log(minutes, seconds); 
  
        window.document.getElementById("secs").textContent = seconds; 
        window.document.getElementById("mins").textContent = minutes; 
    }
     
      



    }, 1000); 
  }


countDown()

  const [row1Vals, setRow1Vals] = useState([]);
  const [row2Vals, setRow2Vals] = useState([]);
  const [row3Vals, setRow3Vals] = useState([]);
  const [row4Vals, setRow4Vals] = useState([]);

  const [col1Vals, setCol1Vals] = useState([]);
  const [col2Vals, setCol2Vals] = useState([]);
  const [col3Vals, setCol3Vals] = useState([]);
  const [col4Vals, setCol4Vals] = useState([]);


  const fixedVlaues = ["1", "2", "3", "4"];

  // const renderer = ({ minutes, seconds, completed }) => {
  //   if (completed) {


  //     if (!boardState)
  //       return <p> Sorry you lose! </p>;
  //   } else {
  //     // Render a countdown
  //     console.log(boardState);
  //     if (boardState)
  //       return <p> You won! </p>;
  //     return (
  //       <span>
  //         {minutes}: {seconds}
  //       </span>
  //     );
  //   }
  // };

  function createRowValues(v1, v2, v3, v4) {
    return [v1, v2, v3, v4];
  }

  function createBoard(row1Values, row2Values, row3Values, row4Values) {
    return [
      createRowValues(...row1Values),
      createRowValues(...row2Values),
      createRowValues(...row3Values),
      createRowValues(...row4Values)
    ];
  }

  const board = createBoard(row1Vals, row2Vals, row3Vals, row4Vals);

  console.log(board);

  function checkRowValues(rowVals) {


    if ((new Set(rowVals)).size !== rowVals.length) {
      return false;
    }



    rowVals.forEach(element => {
      if (!fixedVlaues.includes(element)) {
        return false;
      }
    });

    return true;

  }
  const arrayColumn = (arr, n) => arr.map(x => x[n]);


  function checkColValues(colVals) {
    if ((new Set(colVals)).size !== colVals.length) {
      return false;
    }

    colVals.forEach(element => {
      if (!fixedVlaues.includes(element)) {
        return false;
      }
    });

    return true;
  }

  function getBoardState(newBoard) {

    return (
      checkRowValues(newBoard[0])
      &&
      checkRowValues(newBoard[1])
      &&
      checkRowValues(newBoard[2])
      &&
      checkRowValues(newBoard[3])
      &&
      checkRowValues(arrayColumn(newBoard, 0))
      &&
      checkRowValues(arrayColumn(newBoard, 1))
      &&
      checkRowValues(arrayColumn(newBoard, 2))
      &&
      checkRowValues(arrayColumn(newBoard, 3))
    );
  }


  let boardState = getBoardState(board);

  console.log(boardState, "board state is :  ");

  return (
    <>

      <span id="mins"> 02 </span> 
        : 
      <span id="secs"> 00 </span> 
      
      {/* <Countdown date={Date.now() + 120000} renderer={renderer} /> */}
      <div className="App">
        <div className="row">
          <input
            onChange={(e) => {
              if (e.target.value) {
                setRow1Vals([...row1Vals, e.target.value]);
                setCol1Vals([...col1Vals, e.target.value]);
              }
            }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow1Vals([...row1Vals, e.target.value]);
              setCol2Vals([...col2Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow1Vals([...row1Vals, e.target.value]);
              setCol3Vals([...col3Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {

              setRow1Vals([...row1Vals, e.target.value]);
              setCol4Vals([...col4Vals, e.target.value]);
            }
          }} />
        </div>
        <div className="row">
          <input onChange={(e) => {
            if (e.target.value) {

              setRow2Vals([...row2Vals, e.target.value]);
              setCol1Vals([...col1Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow2Vals([...row2Vals, e.target.value]);
              setCol2Vals([...col2Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow2Vals([...row2Vals, e.target.value]);
              setCol3Vals([...col3Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow2Vals([...row2Vals, e.target.value]);
              setCol4Vals([...col4Vals, e.target.value]);
            }
          }} />
        </div>
        <div className="row">
          <input onChange={(e) => {
            if (e.target.value) {
              setRow3Vals([...row3Vals, e.target.value]);
              setCol1Vals([...col1Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow3Vals([...row3Vals, e.target.value]);
              setCol2Vals([...col2Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {

            if (e.target.value) {

              setRow3Vals([...row3Vals, e.target.value]);
              setCol3Vals([...col3Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {

            if (e.target.value) {

              setRow3Vals([...row3Vals, e.target.value]);
              setCol3Vals([...col3Vals, e.target.value]);
            }
          }} />
        </div>
        <div className="row">
          <input onChange={(e) => {

            if (e.target.value) {

              setRow4Vals([...row4Vals, e.target.value]);
              setCol1Vals([...col1Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow4Vals([...row4Vals, e.target.value]);
              setCol2Vals([...col2Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow4Vals([...row4Vals, e.target.value]);
              setCol3Vals([...col3Vals, e.target.value]);
            }
          }} />
          <input onChange={(e) => {
            if (e.target.value) {
              setRow4Vals([...row4Vals, e.target.value]);
              setCol4Vals([...col4Vals, e.target.value]);
            }
          }} />
        </div>
      </div>
    </>
  );
}
