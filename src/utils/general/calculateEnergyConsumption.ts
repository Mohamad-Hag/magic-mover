import defaultMoverEnergy from "../../constants/defaultMoverEnergy";

function calculateEnergyConsumption(itemWeight: number) {
  // Define a base energy consumption rate (adjust as needed)
  const baseEnergyRate = defaultMoverEnergy;

  // Define a factor to adjust energy consumption based on item weight
  const weightFactor = 0.5;

  // Calculate energy consumption
  const energyConsumption = baseEnergyRate + itemWeight * weightFactor;

  return energyConsumption;
}

export default calculateEnergyConsumption;
