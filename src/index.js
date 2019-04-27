import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const { useState } = React;
const Keyboard = ({ displayNewToken }) => {
  return (
    <div id="keyboard">
      <button className="button-broad" onClick={() => displayNewToken("ac")}>
        AC
      </button>
      <button onClick={() => displayNewToken("/")}>/</button>
      <button onClick={() => displayNewToken("*")}>x</button>
      <br />
      <button onClick={() => displayNewToken("7")}>7</button>
      <button onClick={() => displayNewToken("8")}>8</button>
      <button onClick={() => displayNewToken("9")}>9</button>
      <button onClick={() => displayNewToken("-")}>-</button>
      <br />

      <button onClick={() => displayNewToken("4")}>4</button>
      <button onClick={() => displayNewToken("5")}>5</button>
      <button onClick={() => displayNewToken("6")}>6</button>
      <button onClick={() => displayNewToken("+")}>+</button>
      <br />

      <div id="align-top">
        <button onClick={() => displayNewToken("1")}>1</button>
        <button onClick={() => displayNewToken("2")}>2</button>
        <button onClick={() => displayNewToken("3")}>3</button>
        <button
          className="button-high"
          onClick={() => displayNewToken("=")}
          id="="
        >
          =
        </button>
        <br />
      </div>

      <button className="button-broad" onClick={() => displayNewToken("0")}>
        0
      </button>
      <button onClick={() => displayNewToken(".")} id="decimal">
        .
      </button>
    </div>
  );
};

const Display = ({ calculationText, currentText }) => (
  <div id="display">
    <div id="calculation">{calculationText}</div>
    <hr />
    <div id="current">{currentText}</div>
  </div>
);

const Calculator = () => {
  const INITIAL_CURRENT_TEXT = "Click to start";
  const [currentText, setCurrentText] = useState(INITIAL_CURRENT_TEXT);
  const [calculationText, setCalculationText] = useState(" ");

  const displayNewToken = token => {
    let calcTextResult = /=/.test(calculationText)
      ? calculationText.split("=")[1]
      : calculationText;
    const isNumberOrPoint = /[0-9|.]/;
    const isOperator = /[(+|-|/|*)]/;

    if (isNumberOrPoint.test(token)) {
      if (/=/.test(calculationText)) {
        return reset(token);
      }

      if (
        (currentText.length === 1 && currentText[0] === "0" && token !== ".") ||
        currentText === INITIAL_CURRENT_TEXT ||
        isOperator.test(calculationText[calculationText.length - 1])
      ) {
        setCurrentText(token);
      } else {
        setCurrentText(currentText + token);
      }

      setCalculationText(calcTextResult + token);
    } else {
      if (!isNumberOrPoint.test(calculationText[calculationText.length - 1])) {
        setCalculationText(
          calcTextResult.slice(0, calcTextResult.length - 1) + token
        );
        setCurrentText(token);
      } else {
        setCalculationText(calcTextResult + token);
        setCurrentText(token);
      }
    }
    if (token === "=") calculateResult();
    if (token === "ac") reset();
  };

  const calculateResult = () => {
    try {
      const result = Number(eval(calculationText));
      setCurrentText(result);
      setCalculationText(calculationText + "=" + result);
    } catch (e) {
      setCurrentText("error");
    }
  };
  const reset = newValue => {
    setCurrentText(newValue ? newValue : "0");
    setCalculationText(newValue ? newValue : "");
  };
  const setCalcText = newValue => {
    let calcTextCleaned = calculationText;
    if (/=/.test(calculationText)) {
      calcTextCleaned = calculationText.split("=")[1];
      setCalculationText(calcTextCleaned + newValue);
    }
  };
  return (
    <div id="calculator">
      <Display currentText={currentText} calculationText={calculationText} />
      <Keyboard displayNewToken={displayNewToken} />
    </div>
  );
};

ReactDOM.render(<Calculator />, document.querySelector("#root"));
