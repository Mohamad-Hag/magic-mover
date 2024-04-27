import Mover from "../../layers/models/mover.model";
import AppResponse from "../../typings/general/AppResponse";
import calculateEnergyConsumption from "../general/calculateEnergyConsumption";
import getMessageByCode from "../general/getMessageByCode";

async function updateMoverCounters(
  moverName: string,
  weight: number
): Promise<AppResponse> {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };

  const result = await Mover.findOneAndUpdate(
    { name: moverName },
    {
      $inc: {
        numberOfCurrentLoadedItems: 1,
        totalHoldWeight: weight,
        energy: -calculateEnergyConsumption(weight),
      },
    }
  );

  if (!result)
    response = {
      isError: true,
      code: 705,
      message: getMessageByCode(705),      
    };

  else response.data = result;
  
  return response;
}

export default updateMoverCounters;
