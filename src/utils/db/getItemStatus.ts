import AppResponse from "../../typings/general/AppResponse";
import getMessageByCode from "../general/getMessageByCode";
import checkItemExist from "./checkItemExist";

async function getItemStatus(itemName: string): Promise<AppResponse> {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };

  const item = await checkItemExist(itemName);

  if (item.isError)
    response = {
      isError: true,
      message: item.error!,
      code: 601,
    };
  else if (!item.isExist)
    response = {
      isError: true,
      message: getMessageByCode(604),
      code: 604,
    };
  else {
    const status = item.data.status;
    response.data = status;
  }

  return response;
}

export default getItemStatus;
