import Item from "../../layers/models/item.model";
import Exist from "../../typings/general/Exist";
import IItemSchema from "../../typings/schemas/IItemSchema";

async function checkItemExist(itemName: string): Promise<Exist> {
  let exist: Exist<IItemSchema> = { isExist: true, isError: false };

  try {
    const mover = await Item.findOne({ name: itemName });
    if (mover) exist.data = mover;
    else exist.isExist = false;
  } catch (error: any) {
    console.log("Error in checkItemExist:", error.message);
    exist.isError = true;
    exist.error = error.message;
  }

  return exist;
}

export default checkItemExist;
