import { Request, Response } from "express";
import Joi from "joi";
import JoiDefaultOptions from "../../../constants/JoiDefaultOptions";
import AppResponse from "../../../typings/general/AppResponse";
import ICreateItemVO from "../../../typings/validationObjects/ICreateItemVO";
import checkItemExist from "../../../utils/db/checkItemExist";
import getMessageByCode from "../../../utils/general/getMessageByCode";

async function validateServer(body: ICreateItemVO): Promise<AppResponse> {
  let response: AppResponse = {
    isError: false,
    message: "Success",
    code: 200,
  };
  let checkExist = await checkItemExist(body.name);

  if (checkExist.isError)
    response = {
      isError: true,
      code: 601,
      message: "Internal Server Error: " + checkExist.error,
    };
  else if (checkExist.isExist)
    response = {
      code: 602,
      isError: true,
      message: getMessageByCode(602),
    };

  return response;
}

function validateClient(body: ICreateItemVO) {
  let response: AppResponse = { isError: false, message: "Success", code: 200 };

  const schema = Joi.object<ICreateItemVO>({
    name: Joi.string().min(2).required(),
    weight: Joi.number().min(1).required(),
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

async function validateCreateItem(
  req: Request,
  res: Response,
  next: () => void
) {
  const body: ICreateItemVO = req.body;
  const clientResponse = validateClient(body);
  if (clientResponse.isError) res.json(clientResponse);
  else {
    const serverResponse = await validateServer(body);
    if (serverResponse.isError) res.json(serverResponse);
    else next();
  }
}

export default validateCreateItem;
