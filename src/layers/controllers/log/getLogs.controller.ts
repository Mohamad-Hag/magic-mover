import { Request, Response } from "express";

async function getLogs(req: Request, res: Response) {
  res.send("all logs") 
}

export default getLogs;
