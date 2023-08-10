export const types = ["Status"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "Publish",
    description: "Pubished posts are publicly visible to visitors.",
    type: "Status",
  },
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "Draft",
    description: "Drafts are unfinished posts for later editing.",
    type: "Status",
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "Trash",
    description: "Moves post to Trash but not permanently.",
    type: "Status",
  },
];
