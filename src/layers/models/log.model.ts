import mongoose from "mongoose";
import ILogSchema from "../../typings/schemas/ILogSchema";
import { objectTypes } from "../../typings/general/ObjectTypes";

const logSchema = new mongoose.Schema<ILogSchema>({
  objectType: {
    type: String,
    required: true,
    enum: objectTypes,
  },
  event: {
    type: String,
    required: true,
    minLength: 2,
  },
});

const Log = mongoose.model("log", logSchema);

export default Log;
