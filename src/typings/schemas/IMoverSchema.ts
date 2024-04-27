import QuestStates from "../general/QuestStates";

interface IMoverSchema {
  name: string;
  weightLimit: number;
  questState?: QuestStates;
  numberOfCurrentLoadedItems?: number;
  totalHoldWeight: number;
  energy?: number;
};

export default IMoverSchema;