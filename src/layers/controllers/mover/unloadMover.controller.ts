import { Request, Response } from "express";
import AppResponse from "../../../typings/general/AppResponse";
import IUnloadMoverVO from "../../../typings/validationObjects/IUnloadMoverVO";
import Mover from "../../models/mover.model";
import getMessageByCode from "../../../utils/general/getMessageByCode";

async function LoadMover(req: Request, res: Response) {
  let response: AppResponse = {
    isError: false,
    message: "Mover Unloaded successfully",
    code: 200,
  };
  const { mover }: IUnloadMoverVO = req.body;

  const update = await Mover.findOneAndUpdate(
    { name: mover },
    {
      $set: {
        energy: 100,
        questState: "resting",
        numberOfCurrentLoadedItems: 0,
        totalHoldWeight: 0,
      },
    }
  );
  

  if (!update) response = {
    isError: true,
    message: getMessageByCode(704),
    code: 704,
  };

  res.send(response);
}

export default LoadMover;
