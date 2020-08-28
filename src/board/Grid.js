import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import { Button } from "reactstrap";
import space from "../assets/space.png";

const gridRows = 50;
const gridCols = 50;

// const ops = [
//   [1, 1],
//   [-1, -1],
//   [-1, 1],
//   [1, -1],
//   [0, 1],
//   [0, -1],
//   [1, 0],
//   [-1, 0],
// ];
const linePreset = () => {
  const rows = [];
  for (let i = 0; i < gridRows; i++) {
    rows.push(Array.from(Array(gridCols), () => (i == 25 ? 1 : 0)));
  }
  return rows;
};
const clearGridFunc = () => {
  const rows = [];
  for (let i = 0; i < gridRows; i++) {
    rows.push(Array.from(Array(gridCols), () => 0));
  }
  return rows;
};
const evenPreset = () => {
  const rows = [];
  for (let i = 0; i < gridRows; i++) {
    rows.push(Array.from(Array(gridCols), () => 0));
  }
  rows.forEach((r, i) => {
    r.forEach((col, j) => {
      if (j % 2 > 0) {
        rows[i][j] = 1;
      }
    });
  });

  return rows;
};
const treePreset = () => {
  const rows = [];
  for (let i = 0; i < gridRows; i++) {
    rows.push(Array.from(Array(gridCols), () => 0));
  }
  rows.forEach((r, i) => {
    r.forEach((col, j) => {
      if (j % 2 > 0) {
        rows[i][j] = 1;
        rows[j][20] = 1;
      }
    });
  });

  return rows;
};

const crossPreset = () => {
  const rows = [];
  for (let i = 0; i < gridRows; i++) {
    rows.push(Array.from(Array(gridCols), () => 0));
  }
  rows.forEach((r, i) => {
    r.forEach((col, j) => {
      if (j === gridCols / 2) {
        rows[i][j] = 1;
      }
      if (i === gridCols / 2) {
        rows[i][j] = 1;
      }
    });
  });

  return rows;
};

function Grid() {
  const [executing, setExecuting] = useState(false);
  const [counter, setCounter] = useState(0);
  const [grid, setGrid] = useState(clearGridFunc);
  const counterRef = useRef();
  counterRef.current = counter;
  const executionRef = useRef();
  executionRef.current = executing;
  const runsim = useCallback(() => {
    if (!executionRef.current) {
      return;
    }
    setGrid((grid) => {
      return produce(grid, (draft) => {
        for (let row = 0; row < gridRows; row++) {
          for (let col = 0; col < gridCols; col++) {
            let neigbors = 0;
            // ops.forEach(([r, c]) => {
            //   const newrow = row + r;
            //   const newcol = col + c;
            //   if (
            //     newrow >= 0 &&
            //     newrow < gridRows &&
            //     newcol >= 0 &&
            //     newcol < gridCols
            //   ) {
            //     if (grid[newrow][newcol] === 1) {
            //       neigbors++;
            //     }
            //   }
            // });
            // if (grid[row][col] === 1) {
            //   if (neigbors < 2) {
            //     draft[row][col] = 0;
            //   } else if (neigbors > 3) {
            //     draft[row][col] = 0;
            //   }
            // } else if (grid[row][col] === 0) {
            //   if (neigbors === 3) {
            //     draft[row][col] = 1;
            //   }
            // }
            if (
              row >= 0 &&
              row < gridRows &&
              col + 1 >= 0 &&
              col + 1 < gridCols
            ) {
              if (grid[row][col + 1] === 1) {
                neigbors++;
              }
            }
            if (
              row >= 0 &&
              row < gridRows &&
              col - 1 >= 0 &&
              col - 1 < gridCols
            ) {
              if (grid[row][col - 1] === 1) {
                neigbors++;
              }
            }
            if (
              row + 1 >= 0 &&
              row + 1 < gridRows &&
              col >= 0 &&
              col < gridCols
            ) {
              if (grid[row + 1][col] === 1) {
                neigbors++;
              }
            }
            if (
              row - 1 >= 0 &&
              row - 1 < gridRows &&
              col >= 0 &&
              col < gridCols
            ) {
              if (grid[row - 1][col] === 1) {
                neigbors++;
              }
            }
            if (
              row + 1 >= 0 &&
              row + 1 < gridRows &&
              col + 1 >= 0 &&
              col + 1 < gridCols
            ) {
              if (grid[row + 1][col + 1] === 1) {
                neigbors++;
              }
            }
            if (
              row - 1 >= 0 &&
              row - 1 < gridRows &&
              col - 1 >= 0 &&
              col - 1 < gridCols
            ) {
              if (grid[row - 1][col - 1] === 1) {
                neigbors++;
              }
            }
            if (
              row - 1 >= 0 &&
              row - 1 < gridRows &&
              col + 1 >= 0 &&
              col + 1 < gridCols
            ) {
              if (grid[row - 1][col + 1] === 1) {
                neigbors++;
              }
            }
            if (
              row + 1 >= 0 &&
              row + 1 < gridRows &&
              col - 1 >= 0 &&
              col - 1 < gridCols
            ) {
              if (grid[row + 1][col - 1] === 1) {
                neigbors++;
              }
            }
            if (grid[row][col] === 1) {
              if (neigbors < 2) {
                draft[row][col] = 0;
              } else if (neigbors > 3) {
                draft[row][col] = 0;
              }
            } else if (grid[row][col] === 0) {
              if (neigbors === 3) {
                draft[row][col] = 1;
              }
            }
          }
        }
      });
    });
    setCounter(counterRef.current + 1);
    setTimeout(runsim, 100);
  }, []);
  console.log(grid);
  return (
    <div style={{ backgroundColor: "black" }}>
      <Button
        style={{ width: "100%" }}
        color={executing ? "danger" : "success"}
        onClick={() => {
          setExecuting(!executing);
          executionRef.current = true;
          runsim();
        }}
      >
        {executing ? "Stop" : "Start"}
      </Button>
      <Button
        style={{ width: "100%" }}
        disabled={executing ? true : false}
        color={executing ? "secondary" : "warning"}
        onClick={() => {
          setGrid(clearGridFunc);
          setCounter(0);
          counterRef.current = counter;
        }}
      >
        Reset
      </Button>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          backgroundColor: "black",
        }}
      >
        <Button
          className="preset"
          disabled={executing ? true : false}
          color={executing ? "secondary" : "info"}
          onClick={() => {
            setGrid(crossPreset);
            setCounter(0);
            counterRef.current = counter;
          }}
        >
          preset 1
        </Button>
        <Button
          className="preset"
          disabled={executing ? true : false}
          color={executing ? "secondary" : "info"}
          onClick={() => {
            setGrid(evenPreset);
            setCounter(0);
            counterRef.current = counter;
          }}
        >
          preset 2
        </Button>
        <Button
          className="preset"
          disabled={executing ? true : false}
          color={executing ? "secondary" : "info"}
          onClick={() => {
            setGrid(treePreset);
            setCounter(0);
            counterRef.current = counter;
          }}
        >
          preset 3
        </Button>
        <Button
          className="preset"
          disabled={executing ? true : false}
          color={executing ? "secondary" : "info"}
          onClick={() => {
            setGrid(linePreset);
            setCounter(0);
            counterRef.current = counter;
          }}
        >
          preset 4
        </Button>
      </div>

      <div style={{ background: "rgba(105,105,105,0.4)" }}>
        <h1>{`Generations: ${counter}`}</h1>
        <div
          style={{
            margin: "2% auto",
            backgroundImage: `url(${space})`,
            width: `${gridCols * 10}px`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridCols}, 10px)`,
            }}
          >
            {grid.map((r, i) =>
              r.map((c, j) => (
                <div
                  key={`${i}-${j}`}
                  onClick={() => {
                    // const draftGrid = produce(grid, (copiedgrid) => {
                    //   copiedgrid[i][j] = copiedgrid[i][j] ? 0 : 1;
                    // });
                    if (!executing) {
                      setGrid((grid) => {
                        return produce(grid, (draft) => {
                          draft[i][j] = draft[i][j] ? 0 : 1;
                        });
                      });
                    }
                    // grid[i][j] = 1;
                  }}
                  style={{
                    height: "10px",
                    width: "10px",
                    backgroundColor: grid[i][j] ? "blue" : "transparent",
                    border: "solid 1px gray",
                  }}
                ></div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid;
