import mongoose from "mongoose";
import IMoverSchema from "../../typings/schemas/IMoverSchema";
import defaultMoverWeightLimit from "../../constants/defaultMoverWeightLimit";
import { questStates } from "../../typings/general/QuestStates";
import defaultQuestState from "../../constants/defaultQuestState";

const moverSchema = new mongoose.Schema<IMoverSchema>({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  weightLimit: {
    type: Number,
    required: true,
    default: defaultMoverWeightLimit,
    min: 1,
  },
  energy: {
    type: Number,
    min: 0,
    default: defaultMoverWeightLimit,
  },
  questState: {
    type: String,
    default: defaultQuestState,
    enum: questStates,
  },
  numberOfCurrentLoadedItems: {
    type: Number,
    min: 0,
    default: 0,
  },
  totalHoldWeight: {
    type: Number,
    min: 0,
    default: 0,
  }
});

const Mover = mongoose.model("Mover", moverSchema);

export default Mover;
