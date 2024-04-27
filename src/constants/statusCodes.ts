import StatusCode from "../typings/general/StatusCode";

const StatusCodes: StatusCode[] = [
  {
    code: 700,
    message: "Item validation error",
  },
  {
    code: 701,
    message: "Item exception",
  },
  {
    code: 702,
    message: "Item is already exist",
  },
  {
    code: 703,
    message: "Can't update mover status",
  },
  {
    code: 704,
    message: "Mover not found",
  },
  {
    code: 705,
    message:
      "Can't update mover counters (energy, totalHoldWeight, numberOfCurrentLoadedItems)",
  },
  {
    code: 706,
    message: "Mover has no enough energy to load this item",
  },
  {
    code: 707,
    message:
      "Can't load mover with this item because of its weight or mover is on a mission",
  },
  {
    code: 600,
    message: "Mover validation error",
  },
  {
    code: 601,
    message: "Mover exception",
  },
  {
    code: 602,
    message: "Mover is already exist",
  },
  {
    code: 603,
    message: "Can't update item status",
  },
  {
    code: 604,
    message: "Item not found",
  },
  {
    code: 605,
    message: "Can't load item into mover because the item has a mission",
  },
];

export default StatusCodes;
