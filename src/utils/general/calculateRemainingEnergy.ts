import defaultMoverEnergy from "../../constants/defaultMoverEnergy";

// Function to calculate remaining energy after loading items
function calculateRemainingEnergy(
  initialEnergy: number,
  itemWeight: number
): number {
  // Define a base energy consumption rate (adjust as needed)
  const baseEnergyRate = defaultMoverEnergy;

  // Define a factor to adjust energy consumption based on item weight
  const weightFactor = 0.5;

  // Calculate energy consumption
  const energyConsumption = baseEnergyRate + itemWeight * weightFactor;

  // Calculate remaining energy
  const remainingEnergy = initialEnergy - energyConsumption;

  // Ensure remaining energy is not negative
  return remainingEnergy >= 0 ? remainingEnergy : 0;
}

export default calculateRemainingEnergy;
