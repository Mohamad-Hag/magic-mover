import QuestStates, { questStates } from "../../typings/general/QuestStates";
import IMoverSchema from "../../typings/schemas/IMoverSchema";
import checkMoverExist from "./checkMoverExist";
import getMoverQuestState from "./getMoverQuestState";

async function canLoadMover(
  moverName: string,
  weight: number
): Promise<boolean> {
  const result = await checkMoverExist(moverName);
  if (result.isError) return false;

  const data: IMoverSchema = result.data;
  const questState: QuestStates = data.questState!;
  const totalHoldWeight: number = data.totalHoldWeight!;
  const weightLimit: number = data.weightLimit!;
  const remainingWeight: number = weightLimit - totalHoldWeight;  

  const canLoad = questState !== questStates[2] && weight <= remainingWeight;

  return canLoad;
}
export default canLoadMover;
