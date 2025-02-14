import { useState } from "react";
import SlotMachineSymbol from "./SlotMachineSymbol";
import CustomButton from "./PlayButton";

const SlotMachine = () => {
    const [credit, SetCredit] = useState(10);
    const disabled = credit <= 0;
    
return (
    <div className="slot-machine">
      <div className="slot-machine-symbols-row">
        <SlotMachineSymbol />
        <SlotMachineSymbol />
        <SlotMachineSymbol />
      </div>
      <CustomButton
        className={`play-button ${disabled ? "disabled" : ""}`}
        title="PLAY"
        onClickHandler={() => {
            console.log("Play button component was clicked")
            SetCredit((prev) => prev - 1 )
        }}
        disabled={disabled}
      />
      <CustomButton
        className={`cash-out-button ${disabled ? "disabled" : ""}`}
        title="CASH OUT"
        onClickHandler={() =>
          console.log("Cash out button component was clicked")
        }
        disabled={disabled}
      />
      <div>Remaining Credit: {credit}</div>
    </div>
  );
};

export default SlotMachine;
