import { useState } from "react";
import SlotMachineSymbol from "./SlotMachineSymbol";
import CustomButton from "./PlayButton";
import {
  getValueFromLocalStorage,
  storeValueToLocalStorage,
  getRandomElementFromArray,
} from "../utils/helpers";

function initalizeCredit() {
  const initialCredit = getValueFromLocalStorage("credit", 10);
  if (initialCredit <= 0) {
    storeValueToLocalStorage("credit", 10);
    return 10;
  }
  return initialCredit;
}

const SlotMachine = ({
  numberOfSymbols = 3,
  symbolsSet = ["🍒", "🍉", "🍋", "🍍"],
  interSymbolDelay = 1000,
}) => {
  const [credit, SetCredit] = useState(initalizeCredit);
  const [symbols, setSymbols] = useState(
    Array.from({ length: numberOfSymbols }, () => symbolsSet[0])
  );
  const noMoreCredit = credit <= 0;

  const animateSymbols = (newSymbols) => {
    newSymbols.forEach((symbol, index) => {
      setTimeout(() => {
        setSymbols((prev) => {
          const updatedSymbols = [...prev];
          updatedSymbols[index] = symbol;
          return updatedSymbols;
        });
      }, index * interSymbolDelay); // Animate one at a time with a delay
    });
  };

  const deductCredit = () => {
    storeValueToLocalStorage("credit", credit - 1);
    SetCredit((prev) => prev - 1);
  };

  const playButtonClickHandler = async () => {
    console.log("Play button component was clicked");
    // Show an initial placeholder symbol for animation
    setSymbols(symbols.map(() => "X"));

    setTimeout(() => {
      const newSymbols = symbols.map(() =>
        getRandomElementFromArray(symbolsSet)
      );
      animateSymbols(newSymbols);
    }, 1000);

    deductCredit();
  };

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
        disabled={noMoreCredit}
      />
      <CustomButton
        className={`cash-out-button ${noMoreCredit ? "disabled" : ""}`}
        title="CASH OUT"
        onClickHandler={() =>
          console.log("Cash out button component was clicked")
        }
        disabled={noMoreCredit}
      />
      <div>Remaining Credit: {credit}</div>
    </div>
  );
};

export default SlotMachine;
