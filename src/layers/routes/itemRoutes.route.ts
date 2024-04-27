import express from "express";
import createItem from "../controllers/item/createItem.controller";
import validateCreateItem from "../middlewares/validators/validateCreateItem.middleware";

const router = express.Router();

router.post("/create", validateCreateItem, createItem);

export default router;
