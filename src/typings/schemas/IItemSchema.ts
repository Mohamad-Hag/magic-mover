import ItemStatuses from "../general/ItemStatuses";

interface IItemSchema {
  name: string;
  weight: number;
  status?: ItemStatuses,
}

export default IItemSchema;