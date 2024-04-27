export const itemStatuses = ["freezed", "loaded"] as const;

type ItemStatuses = typeof itemStatuses[number];

export default ItemStatuses;
