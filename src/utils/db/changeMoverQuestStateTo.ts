import Mover from "../../layers/models/mover.model";
import AppResponse from "../../typings/general/AppResponse";
import QuestStates from "../../typings/general/QuestStates";
import getMessageByCode from "../general/getMessageByCode";

async function changeMoverQuestStateTo(
  moverName: string,
  state: QuestStates
): Promise<AppResponse> {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };

  try {
    const result = await Mover.findOneAndUpdate(
      { name: moverName },
      { $set: { questState: state } }
    );

    if (!result)
      response = {
        isError: true,
        code: 703,
        message: getMessageByCode(703),
        data: result,
      };
  } catch (error: any) {
    response = {
      isError: true,
      code: 701,
      message: "Internal Server Error: " + error.message,
    };
  }

  return response;
}

export default changeMoverQuestStateTo;
