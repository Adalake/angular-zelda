import { TypedItem } from "./share";
import { User } from "./user";

export type Study = TypedItem<
  typeof StudyType,
  string,
  {
    readonly height: number;
    readonly is_anonymous?: boolean;
    readonly operator_id: string;
    readonly patient_id: string;
    readonly sex: Sex;
    readonly start_time?: Date;
    readonly end_time?: Date;
    readonly description?: string;
    readonly name: string;
    readonly weight: number;
    readonly state: StudyState;
    readonly operator?: User;
  },
  {
    // readonly children_ids: string[];
  }
>;

export const StudyType = "Study" as const;

export enum Sex {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export enum StudyState {
  Unstarted = "Unstarted",
  Closed = "Closed"
}
