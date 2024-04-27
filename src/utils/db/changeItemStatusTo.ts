import Item from "../../layers/models/item.model";
import AppResponse from "../../typings/general/AppResponse";
import ItemStatuses from "../../typings/general/ItemStatuses";
import getMessageByCode from "../general/getMessageByCode";

async function changeItemStatusTo(
  itemName: string,
  status: ItemStatuses
): Promise<AppResponse> {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };

  try {
    const result = await Item.findOneAndUpdate(
      { name: itemName },
      { $set: { questState: status } }
    );

    if (!result)
      response = {
        isError: true,
        code: 603,
        message: getMessageByCode(603),
        data: result,
      };
  } catch (error: any) {
    response = {
      isError: true,
      code: 601,
      message: "Internal Server Error: " + error.message,
    };
  }

  return response;
}

export default changeItemStatusTo;
