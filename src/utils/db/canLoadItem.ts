import { itemStatuses } from "../../typings/general/ItemStatuses";
import getItemStatus from "./getItemStatus";

async function canLoadItem(itemName: string): Promise<boolean> {
  let result = await getItemStatus(itemName);

  return result.isError ? false : result.data === itemStatuses[0]; // Freezing
}

export default canLoadItem;
