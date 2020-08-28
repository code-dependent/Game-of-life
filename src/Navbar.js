import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Navbar(props) {
  const [aboutModal, setAboutModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(true);

  const toggleAbout = () => {
    setAboutModal(!aboutModal);
  };
  const toggleRules = () => {
    setRulesModal(!rulesModal);
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0% auto",
        }}
      >
        <h1 style={{ margin: "3% auto" }}>The Game of Life</h1>
        <nav style={{ display: "flex", justifyContent: "space-around" }}>
          <Link onClick={toggleAbout}>About</Link>
          <Link onClick={toggleRules}>Rules</Link>
        </nav>
      </header>
      <Modal isOpen={aboutModal} toggle={toggleAbout} className="about">
        <ModalHeader toggle={toggleAbout}>
          📄 About the Game of Life
        </ModalHeader>
        <ModalBody>
          Game of Life, also known simply as Life, is a cellular automaton
          devised by the British mathematician John Horton Conway in 1970. It is
          a zero-player game, meaning that its evolution is determined by its
          initial state, requiring no further input. One interacts with the Game
          of Life by creating an initial configuration and observing how it
          evolves. It is Turing complete and can simulate a universal
          constructor or any other Turing machine. <br />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          >
            Learn More.
          </Button>{" "}
          <Button color="secondary" onClick={toggleAbout}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={rulesModal} toggle={toggleRules}>
        <ModalHeader toggle={toggleRules}>🧭 Rules</ModalHeader>
        <ModalBody>
          The universe of the Game of Life is an infinite, two-dimensional
          orthogonal grid of square cells, each of which is in one of two
          possible states, live or dead. Every cell interacts with its
          eight neighbours, which are the cells that are horizontally,
          vertically, or diagonally adjacent. At each step in time, the
          following transitions occur:
          <span className="rules">
            <br />
            <br />
            1. Any live cell with fewer than two live neighbours dies.
          </span>
          <span className="rules">
            <br />
            2. Any live cell with two or three live neighbours lives on to the
            next generation.
          </span>
          <span className="rules">
            <br />
            3. Any live cell with more than three live neighbours dies.
          </span>
          <span className="rules">
            <br />
            4. Any dead cell with exactly three live neighbours becomes a live
            cell.
          </span>
          <br />
          <br />
          These rules, which compare the behavior of the automaton to real life,
          can be condensed into the following:
          <span className="rules">
            <br />
            <br />
            1. Any live cell with two or three live neighbours survives.
          </span>
          <span className="rules">
            <br />
            2. Any dead cell with three live neighbours becomes a live cell.
          </span>
          <span className="rules">
            <br />
            3. All other live cells die in the next generation. Similarly, all
            other dead cells stay dead.
          </span>
          <br />
          The initial pattern constitutes the seed of the system. The first
          generation is created by applying the above rules simultaneously to
          every cell in the seed.
          <br />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          >
            Learn More.
          </Button>{" "}
          <Button color="secondary" onClick={toggleRules}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );

  //   return (
  //     <header
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         margin: "0% auto",
  //       }}
  //     >
  //       <h1>Conway's Game of Life</h1>
  //       <nav style={{ display: "flex", justifyContent: "space-around" }}>
  //         <Link to="/about" onClick={toggleAbout}>About</Link>
  //         <Link to="/">Home</Link>
  //         <Link to="/patterns">Patterns</Link>
  //       </nav>
  //     </header>
  //   );
}

export default Navbar;
