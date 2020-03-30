import gql from "graphql-tag";

export namespace GQLScan {
  const FragmentScanHelicalName = "ScanHelicalFields";
  const FragmentScanHelicalFields = gql`
    fragment ${FragmentScanHelicalName} on scan_helical_view {
        __typename
        id
        name
        param_1 
        param_2
        param_3
}`;
  const FragmentScanScoutName = "ScanScoutFields";
  const FragmentScanScoutFields = gql`
    fragment ${FragmentScanScoutName} on scan_scout_view {
        __typename
        id
        name
        param_1 
        param_2
        param_3
}`;

  export namespace query {
    export const QueryItem = gql`
      query MyQuery($ids: [uuid!]) {
        protocol_item_view(where: { id: { _in: $ids } }) {
          id
          protocol_item_ids
          protocol_item_detail
        }
      }
    `;

    export const Query = gql`
      query MyQuery($ids: [uuid!]) {
        protocol_item {
          scan_helical(where: { id: { _in: $ids } }) {
            id
            name
            param_1
            param_2
            param_3
          }
          scan_scout(where: { id: { _in: $ids } }) {
            id
            name
            param_1
            param_2
            param_3
          }
        }
      }
    `;
    export interface Response {
      scan_helical_view: Array<FragmentScanHelicalResponse>;
      scan_scout_view: Array<FragmentScanScoutResponse>;
    }
    export interface Variable {
      ids: string[];
    }
  }
  export namespace subscription {
    export const subscribe_scan_scout = gql`
      subscription sub_scan_scout($ids: [uuid!]) {
        scan_scout_view(where: { id: { _in: $ids } }) {
          ...${FragmentScanScoutName}
          }
      }
      ${FragmentScanScoutFields}
      `;
    export const subscribe_scan_helical = gql`
      subscription sub_scan_helical($ids: [uuid!]) {
        scan_helical_view(where: { id: { _in: $ids } }) {
          ...${FragmentScanHelicalName}
          }
      }
      ${FragmentScanHelicalFields}
      `;
    export interface Response {
      scan_helical_view: Array<FragmentScanHelicalResponse>;
      scan_scout_view: Array<FragmentScanScoutResponse>;
    }
  }
  interface ScanHelicalFields {
    id: string;
    name: string;
    param_1: string;
    param_2: string;
    param_3: string;
  }
  interface ScanScoutFields {
    id: string;
    name: string;
    param_1: string;
    param_2: string;
    param_3: string;
  }
  export interface FragmentScanHelicalResponse extends ScanHelicalFields {
    __typename: string;
  }
  export interface FragmentScanScoutResponse extends ScanScoutFields {
    __typename: string;
  }
}
