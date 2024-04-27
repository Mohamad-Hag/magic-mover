import { Request, Response } from "express";
import ICreateMoverVO from "../../../typings/validationObjects/ICreateMoverVO";
import Mover from "../../models/mover.model";
import AppResponse from "../../../typings/general/AppResponse";

async function createMover(req: Request, res: Response) {
  let response: AppResponse = {
    isError: false,
    message: "Mover create success",
    code: 201,
  };
  const body: ICreateMoverVO = req.body;

  try {
    const item = await Mover.create(body);
    item.save();
    response.data = item;
  } catch (error) {
    console.log("Error in createMover controller:", (error as any).message);
    response = { isError: true, message: (error as any).message, code: 601 };
  }

  res.json(response);
}

export default createMover;
