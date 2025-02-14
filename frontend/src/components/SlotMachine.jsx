import { useState } from "react";
import SlotMachineSymbol from "./SlotMachineSymbol";
import CustomButton from "./PlayButton";
import { getValueFromLocalStorage, storeValueToLocalStorage } from "../utils/helpers";

const SlotMachine = () => {
    const [credit, SetCredit] = useState(getValueFromLocalStorage("credit", 10));
    const noMoreCredit = credit <= 0;
    
return (
    <div className="slot-machine">
      <div className="slot-machine-symbols-row">
        <SlotMachineSymbol />
        <SlotMachineSymbol />
        <SlotMachineSymbol />
      </div>
      <CustomButton
        className={`play-button ${noMoreCredit ? "disabled" : ""}`}
        title="PLAY"
        onClickHandler={() => {
            console.log("Play button component was clicked")
            storeValueToLocalStorage("credit", credit - 1)
            SetCredit((prev) => prev - 1 )
        }}
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
