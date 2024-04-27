export const questStates = ["resting", "loading", "mission"] as const;

type QuestStates = typeof questStates[number];

export default QuestStates;
