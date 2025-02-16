import { useState, useEffect } from "react";
import SlotMachineSymbol from "./SlotMachineSymbol";
import CustomButton from "./PlayButton";
import {
  getValueFromLocalStorage,
  storeValueToLocalStorage,
  getRandomElementFromArray,
} from "../utils/helpers";
import { signup } from "../api/authService.js";
import { createSession, playSession, cashoutSession  } from "../api/sessionService.js";


const SlotMachine = ({
  numberOfSymbols = 3,
  interSymbolDelay = 1000,
}) => {
  const [credit, setCredit] = useState(0);
  const [session, setSession] = useState(null);
  const [symbolsSet, setSymbolsSet] = useState([" "]);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [symbols, setSymbols] = useState(
    Array.from({ length: numberOfSymbols }, () => "X")
  );
  const [sessionIsActive, setSessionIsActive] = useState(false);
  const noMoreCredit = credit <= 0;

  const animateSymbols = (newSymbols) => {
    setAnimationInProgress(true);
    return new Promise((resolve) => {
      newSymbols.forEach((symbol, index) => {
        setTimeout(() => {
          setSymbols((prev) => {
            const updatedSymbols = [...prev];
            updatedSymbols[index] = symbol;
            return updatedSymbols;
          });
          if (index === newSymbols.length - 1) {
            setAnimationInProgress(false);
            resolve();
          }
        }, (index + 1) * interSymbolDelay); // Animate one at a time with a delay
      });
    });
  };

  
  const playButtonClickHandler = async () => {
    // Show an initial placeholder symbol for animation
    setSymbols(symbols.map(() => "X"));

    const response = await playSession(session.id);
    const newSymbols = response.results
    await animateSymbols(newSymbols);
    setCredit(response.credit);
  };

  const cashoutButtonClickHandler = async () => {
    const response = await cashoutSession(session.id);
    setCredit(response.session.credit);
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token || token == "undefined") {
        const response = await signup();
        localStorage.setItem("token", response.data.token);
      }
      const sessionData = await createSession();
      setCredit(sessionData.session.credit);
      setSession(sessionData.session);
      setSymbolsSet(sessionData.symbols);
      setSessionIsActive(true);
    })()
  }, []);

  useEffect(() => {
    setSymbols(Array.from({ length: numberOfSymbols }, () => symbolsSet[0]));
  }, [symbolsSet, numberOfSymbols]);

  return (
    <div className="slot-machine">
      <div className="slot-machine-symbols-row">
        {symbols.map((symbol, index) => (
          <SlotMachineSymbol key={index} symbol={symbol} />
        ))}
      </div>
      <CustomButton
        className={`play-button ${noMoreCredit ? "disabled" : ""}`}
        title="PLAY"
        onClickHandler={playButtonClickHandler}
        disabled={noMoreCredit || animationInProgress}
      />
      <CustomButton
        className={`cash-out-button ${noMoreCredit ? "disabled" : ""}`}
        title="CASH OUT"
        onClickHandler={cashoutButtonClickHandler}
        disabled={noMoreCredit || animationInProgress}
      />
      <div>Remaining Credit: {credit}</div>
    </div>
  );
};

export default SlotMachine;
