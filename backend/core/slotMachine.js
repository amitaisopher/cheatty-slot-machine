import {
  checkIfAllElementsAreEqual,
  generateRandomNumberBeteenRange,
  getRandomElementFromArray,
} from "../utils/helpers.js";
import {
  SLOT_MACHINE_WINNING_AMOUNTS,
  SLOT_MACHINE_SYMPBOLS_SET,
  SLOT_MACHINE_NUMBER_OF_SLOTS,
} from "../config/slotMachine.js";

export function calculateCreditsWon(results) {
  if (!checkIfAllElementsAreEqual(results)) {
    return 0;
  }
  return SLOT_MACHINE_WINNING_AMOUNTS[results[0]];
}

export function generateSlotMachineResults(user) {
  let results = Array.from({ length: SLOT_MACHINE_NUMBER_OF_SLOTS }, () =>
    getRandomElementFromArray(SLOT_MACHINE_SYMPBOLS_SET)
  );

  const isWin = checkIfAllElementsAreEqual(results);

  if (isWin) {
    const cheatRatio = getCheatRatio(user.credit);
    if (cheatRatio > 0) {
      const randomNum = generateRandomNumberBeteenRange(0, 100);
      if (randomNum <= cheatRatio) {
        results = results.map(() =>
          getRandomElementFromArray(SLOT_MACHINE_SYMPBOLS_SET)
        );
      }
    }
  }

  return results;
}

function getCheatRatio(credit) {
  if (credit >= 40 && credit <= 60) {
    return 30;
  } else if (credit > 60) {
    return 60;
  }
  return 0;
}
