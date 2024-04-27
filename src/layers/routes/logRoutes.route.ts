import express from "express";
import createLog from "../controllers/log/createLog.controller";
import getLogs from "../controllers/log/getLogs.controller";

const router = express.Router();

router.post("/create", createLog);
router.get("/", getLogs);

export default router;
