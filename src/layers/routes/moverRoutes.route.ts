import express from "express";
import createMover from "../controllers/mover/createMover.controller";
import LoadMover from "../controllers/mover/loadMover.controller";
import UnloadMover from "../controllers/mover/unloadMover.controller";
import validateCreateMover from "../middlewares/validators/validateCreateMover.middleware";
import validateUnloadMover from "../middlewares/validators/validateUnloadMover.middleware";
import validateLoadMover from "../middlewares/validators/validateLoadMover.middleware";

const router = express.Router();

router.post("/create", validateCreateMover, createMover);
router.post("/load", validateLoadMover, LoadMover);
router.post("/unload", validateUnloadMover, UnloadMover);

export default router;
