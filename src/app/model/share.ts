export interface TagID<Id, Tag> {
  readonly id: Id;
  readonly __typename: Tag;
}

export interface TypedItem<T, Id, D, R> extends TagID<Id, T> {
  data: D;
  relation: R;
}
