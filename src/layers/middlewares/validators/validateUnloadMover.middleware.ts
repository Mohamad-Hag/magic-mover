import { Request, Response } from "express";
import Joi from "joi";
import JoiDefaultOptions from "../../../constants/JoiDefaultOptions";
import AppResponse from "../../../typings/general/AppResponse";
import IUnloadMoverVO from "../../../typings/validationObjects/IUnloadMoverVO";

async function validateServer(body: IUnloadMoverVO): Promise<AppResponse> {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };
  try {
  } catch (error: any) {
    console.log("Error in validateServer:", error);
    response = {
      isError: true,
      code: 701,
      message: "Internal Server Error: " + error.message,
    };
  }

  return response;
}

function validateClient(body: IUnloadMoverVO) {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };

  const schema = Joi.object<IUnloadMoverVO>({
    mover: Joi.string().min(2).required(),
  });

  const result = schema.validate(body, JoiDefaultOptions);
  const isValid = !result.error;

  if (!isValid)
    response = {
      code: 700,
      isError: true,
      message: result.error.message,
    };

  return response;
}

async function validateUnloadMover(
  req: Request,
  res: Response,
  next: () => void
) {
  const body: IUnloadMoverVO = req.body;
  const clientResponse = validateClient(body);
  if (clientResponse.isError) res.json(clientResponse);
  else {
    const serverResponse = await validateServer(body);
    if (serverResponse.isError) res.json(serverResponse);
    else next();
  }
}

export default validateUnloadMover;
