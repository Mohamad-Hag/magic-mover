import mongoose from "mongoose";
import defaultItemStatus from "../../constants/defaultItemStatus";
import { itemStatuses } from "../../typings/general/ItemStatuses";
import IItemSchema from "../../typings/schemas/IItemSchema";

const itemSchema = new mongoose.Schema<IItemSchema>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
  },
  status: {
    type: String,
    default: defaultItemStatus,
    enum: itemStatuses,
  },
  weight: {
    type: Number,
    min: 1,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;