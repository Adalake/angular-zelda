import { TypedItem } from "./share";

export const ProtocolType = "Patient" as const;
export const ProtocolTemplateTtype = "ProtocolTemplate" as const;
export type Protocol = TypedItem<
  typeof ProtocolType,
  string,
  {
    readonly name: string;
    readonly description: Date;
    readonly study_ids: string[];
  },
  {}
>;

export type ProtocolTemplate = TypedItem<
  typeof ProtocolTemplateTtype,
  string,
  { name: string; template_region: ProtocolTemplateRegion },
  {}
>;

export enum ProtocolTemplateRegion {
  Head = "Head",
  Neck = "Neck",
  Abdomen = "Abdomen",
}
