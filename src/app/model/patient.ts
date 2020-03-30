import { TypedItem } from "./share";

export const PatientType = "Patient" as const;

export type Patient = TypedItem<
  typeof PatientType,
  string,
  {
    readonly external_id: string;
    readonly name: string;
    readonly birthday: Date;
    readonly study_ids: string[];
    readonly state: PatientState;
  },
  {}
>;

export enum PatientState {
  Invalid = "invalid",
  valid = "valid"
}
