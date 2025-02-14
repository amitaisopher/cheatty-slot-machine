import { useState } from "react";
import SlotMachineSymbol from "./SlotMachineSymbol";
import CustomButton from "./PlayButton";
import { 
    getValueFromLocalStorage, 
    storeValueToLocalStorage,
    getRandomElementFromArray
 } from "../utils/helpers";

function initalizeCredit() {
    const initialCredit =  getValueFromLocalStorage("credit", 10);
    if (initialCredit <= 0) {
        storeValueToLocalStorage("credit", 10)
        return 10;
    }
    return initialCredit;
}

const SlotMachine = ({numberOfSymbols = 3, symbolsSet=["🍒", "🍉", "🍋", "🍍"]}) => {
    const [credit, SetCredit] = useState(initalizeCredit);
    const [symbols, setSymbols] = useState(Array.from({ length: numberOfSymbols }, () => symbolsSet[0]));
    const noMoreCredit = credit <= 0;
    const playButtonClickHandler = async () => {
        console.log("Play button component was clicked")
        setSymbols(symbols.map(() => "X"))
            setTimeout(() => {
                const newSymbols  = symbols.map(() => getRandomElementFromArray(symbolsSet));
                setTimeout(() => {
                    // replace only the first symbol with the new one
                    setSymbols((prev) => [newSymbols[0], prev[1], prev[2]]);
                }, 0);
                setTimeout(() => {
                    // replace only the second symbol with the new one
                    setSymbols((prev) => [prev[0], newSymbols[1], prev[2]]);
                }, 1000);
                setTimeout(() => {
                    // replace only the third symbol with the new one
                    setSymbols((prev) => [prev[0], prev[1], newSymbols[2]]);
                }, 2000);
            }, 1000);        
        
        storeValueToLocalStorage("credit", credit - 1)
        SetCredit((prev) => prev - 1 )
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
