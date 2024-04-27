import Exist from "../../typings/general/Exist";
import calculateRemainingEnergy from "../general/calculateRemainingEnergy";
import getMessageByCode from "../general/getMessageByCode";
import checkMoverExist from "./checkMoverExist";

async function checkEnergyExist(
  moverName: string,
  weight: number
): Promise<Exist> {
  let exist: Exist = { isExist: true, isError: false };

  let mover = await checkMoverExist(moverName);

  console.log(mover)

  if (!mover.isExist && !mover.isError) {
    exist.isError = true;
    exist.isExist = false;
    exist.error = getMessageByCode(704);
  } else if (mover.isExist && !mover.isError) {
    let remainingEnergy = calculateRemainingEnergy(mover.data.energy, weight);    

    if (remainingEnergy <= 0) {
      exist.isExist = false;
      exist.isError = true;
      exist.error = getMessageByCode(706);
    }
    exist.data = mover.data;
  }

  return exist;
}

export default checkEnergyExist;
