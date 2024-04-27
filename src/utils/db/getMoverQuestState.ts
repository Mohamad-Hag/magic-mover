import AppResponse from "../../typings/general/AppResponse";
import getMessageByCode from "../general/getMessageByCode";
import checkMoverExist from "./checkMoverExist";

async function getMoverQuestState(moverName: string): Promise<AppResponse> {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };

  const mover = await checkMoverExist(moverName);

  if (mover.isError)
    response = {
      isError: true,
      message: mover.error!,
      code: 701,
    };
  else if (!mover.isExist)
    response = {
      isError: true,
      message: getMessageByCode(704),
      code: 704,
    };
  else {
    const questState = mover.data.questState;
    response.data = questState;
  }

  return response;
}

export default getMoverQuestState;
