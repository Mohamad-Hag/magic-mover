import { Request, Response } from "express";
import Joi from "joi";
import JoiDefaultOptions from "../../../constants/JoiDefaultOptions";
import AppResponse from "../../../typings/general/AppResponse";
import ICreateMoverVO from "../../../typings/validationObjects/ICreateMoverVO";
import checkMoverExist from "../../../utils/db/checkMoverExist";
import getMessageByCode from "../../../utils/general/getMessageByCode";

async function validateServer(body: ICreateMoverVO): Promise<AppResponse> {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };
  let checkExist = await checkMoverExist(body.name);

  if (checkExist.isError)
    response = {
      isError: true,
      code: 701,
      message: "Internal Server Error: " + checkExist.error,
    };
  else if (checkExist.isExist)
    response = {
      code: 702,
      isError: true,
      message: getMessageByCode(702),
    };
    

  return response;
}

function validateClient(body: ICreateMoverVO) {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };

  const schema = Joi.object<ICreateMoverVO>({
    name: Joi.string().min(2).required(),
    energy: Joi.number().min(0),
    weightLimit: Joi.number().min(1).required().default(1),
  });

  const result = schema.validate(body, JoiDefaultOptions);
  const isValid = !result.error;

  if (!isValid)
    response = {
      code: 600,
      isError: true,
      message: result.error.message,
    };

  return response;
}

async function validateCreateMover(
  req: Request,
  res: Response,
  next: () => void
) {
  const body: ICreateMoverVO = req.body;
  const clientResponse = validateClient(body);
  if (clientResponse.isError) res.json(clientResponse);
  else {
    const serverResponse = await validateServer(body);
    if (serverResponse.isError) res.json(serverResponse);
    else next();
  }
}

export default validateCreateMover;
