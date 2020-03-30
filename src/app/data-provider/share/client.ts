import { TypedItem } from "src/app/model/share";

export type RawGQLModel<T extends { data: any }> = T["data"] & {
  __typename?: string;
  id: string;
};

export function readRawModel<T extends TypedItem<any, string, any, any>>(
  r: RawGQLModel<T>
): { id: T["id"]; data: T["data"] } {
  const { id, ...data } = r;
  const { __typename, ...cleanData } = data;
  return {
    id,
    data: cleanData
  };
}
