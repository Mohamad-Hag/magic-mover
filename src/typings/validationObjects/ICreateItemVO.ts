import IItemSchema from "../schemas/IItemSchema";

type ItemSchemaWithoutStatus = Omit<IItemSchema, "status">;

interface ICreateItemVO extends ItemSchemaWithoutStatus {}

export default ICreateItemVO;
