import { Request, Response, response } from "express";
import ICreateItemVO from "../../../typings/validationObjects/ICreateItemVO";
import Item from "../../models/item.model";
import AppResponse from "../../../typings/general/AppResponse";

async function createItem(req: Request, res: Response) {
  let response: AppResponse = {
    isError: false,
    message: "Item create success",
    code: 201,
  };
  const body: ICreateItemVO = req.body;

  try {
    const item = await Item.create(body);
    item.save();
    response.data = item;
  } catch (error) {
    console.log("Error in createItem controller:", (error as any).message);
    response = { isError: true, message: (error as any).message, code: 701 };
  }

  res.json(response);
}

export default createItem;
