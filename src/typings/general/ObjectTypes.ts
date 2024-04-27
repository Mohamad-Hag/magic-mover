export const objectTypes = ["log", "mover", "item"] as const;

type ObjectTypes = typeof objectTypes[number];

export default ObjectTypes;