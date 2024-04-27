import { Request, Response } from "express";
import checkEnergyExist from "../../../utils/db/checkEnergyExist";
import ILoadMoverVO from "../../../typings/validationObjects/ILoadMoverVO";
import checkItemExist from "../../../utils/db/checkItemExist";
import AppResponse from "../../../typings/general/AppResponse";
import getMessageByCode from "../../../utils/general/getMessageByCode";
import canLoadMover from "../../../utils/db/canLoadMover";
import canLoadItem from "../../../utils/db/canLoadItem";
import updateMoverCounters from "../../../utils/db/updateMoverCounters";
import changeMoverQuestStateTo from "../../../utils/db/changeMoverQuestStateTo";

async function LoadMover(req: Request, res: Response) {
  let response: AppResponse = {
    isError: false,
    message: "Mover loaded with an item successfully",
    code: 200,
  };
  const { item, mover }: ILoadMoverVO = req.body;

  // Check if item exists
  const itemExist = await checkItemExist(item);

  if (itemExist.isError) {
    response = {
      isError: true,
      message: itemExist.error!,
      code: 601,
    };
    return res.send(response);
  } else if (!itemExist.isExist) {
    response = {
      isError: true,
      message: getMessageByCode(604),
      code: 604,
    };
    return res.send(response);
  }

  // Check mover energy
  const itemWeight = itemExist.data.weight;

  let energyExist = await checkEnergyExist(mover, itemWeight);

  if (energyExist.isError) {
    response = {
      isError: true,
      message: energyExist.error!,
      code: 706,
    };
    return res.send(response);
  } else if (!energyExist.isExist) {
    response = {
      isError: true,
      message: getMessageByCode(706),
      code: 706,
    };
    return res.send(response);
  }

  // Can load mover ? check questState and weight limit
  const loadMover = await canLoadMover(mover, itemWeight);

  if (!loadMover) {
    response = {
      isError: true,
      message: getMessageByCode(707),
      code: 707,
    };
    return res.send(response);
  }

  // Can load item ? check status
  const loadItem = await canLoadItem(item);

  if (!loadItem) {
    response = {
      isError: true,
      message: getMessageByCode(607),
      code: 607,
    };
    return res.send(response);
  }

  // Update mover counters
  const updateCounters = await updateMoverCounters(mover, itemWeight);

  if (updateCounters.isError) return res.send(updateCounters);

  // Update mover quest state
  const updatedTotalWeight = updateCounters.data.totalHoldWeight + itemWeight;
  const weightLimit = updateCounters.data.weightLimit;
  let changeQuestState = null;

  console.log(weightLimit, updatedTotalWeight);
  if (weightLimit === updatedTotalWeight)
    changeQuestState = await changeMoverQuestStateTo(mover, "mission");
  else changeQuestState = await changeMoverQuestStateTo(mover, "loading");

  if (changeQuestState.isError) return res.send(changeQuestState);

  return res.send(response);
}

export default LoadMover;
