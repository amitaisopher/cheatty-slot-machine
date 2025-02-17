import { calculateCreditsWon, generateSlotMachineResults } from '../../core/slotMachine.js';
import { SLOT_MACHINE_WINNING_AMOUNTS, SLOT_MACHINE_NUMBER_OF_SLOTS } from '../../config/slotMachine.js';

describe('Slot Machine', () => {
  it('should calculate credits won', () => {
    const results = ["🍋", "🍋", "🍋"];
    const credits = calculateCreditsWon(results);
    expect(credits).toBe(SLOT_MACHINE_WINNING_AMOUNTS["🍋"]);
  });

  it('should generate slot machine results', () => {
    const user = { credit: 50 };
    const session = { credit: 10 };
    const results = generateSlotMachineResults(user, session);
    expect(results.length).toBe(SLOT_MACHINE_NUMBER_OF_SLOTS);
  });
});