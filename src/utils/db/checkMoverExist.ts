import Mover from "../../layers/models/mover.model";
import Exist from "../../typings/general/Exist";

async function checkMoverExist(moverName: string): Promise<Exist> {
  let exist: Exist = { isExist: true, isError: false };

  try {
    const mover = await Mover.findOne({ name: moverName });

    if (mover) exist.data = mover;
    else exist.isExist = false;
  } catch (error: any) {
    console.log("Error in checkMoverExist:", error);
    exist.isError = true;
    exist.error = error.message;
  }

  return exist;
}

export default checkMoverExist;
