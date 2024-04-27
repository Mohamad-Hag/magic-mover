import IMoverSchema from "../schemas/IMoverSchema";

type MoverSchemaWithoutOthers = Omit<
  IMoverSchema,
  "questState" | "numberOfCurrentLoadedItems"
>;

interface ICreateMoverVO extends MoverSchemaWithoutOthers {}

export default ICreateMoverVO;
