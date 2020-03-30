import { TypedItem } from "./share";
import { Protocol } from "./protocol";

export type Scan = ScanScoutItem | ScanHelicalItem;

export const enum ScanTypes {
  ScanScout = "ScanScout",
  ScanHelical = "ScanHelical"
}

export type ScanHelicalItem = TypedItem<
  ScanTypes.ScanHelical,
  string,
  ScanHelical,
  ScanRelation
>;

export interface ScanHelical {
  param_1: string;
  param_2: string;
  param_3: string;
}
export interface ScanRelation {
  readonly children_ids: string[];
  readonly container_info: {
    id: Protocol["id"];
    index: number;
  };
}

export type ScanScoutItem = TypedItem<
  ScanTypes.ScanScout,
  string,
  ScanScout,
  ScanRelation
>;

export interface ScanScout {
  name: "ScanScout";
  param_1: string;
  param_2: string;
  param_3: string;
}
