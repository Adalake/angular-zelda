import gql from "graphql-tag";
import { RawGQLModel } from "../share/client";
import {
  ProtocolTemplate,
  ProtocolTemplateRegion,
  Protocol
} from "src/app/model/protocol";

const FragmentProtocolFields = `
    fragment ProtocolFields on protocol_view {
        __typename
        id
        name
        study_id
        description
    }
  `;
const FragmentProtocolTemplateFields = gql`
  fragment ProtocolTemplateFields on protocol_template_view {
    __typename
    id
    name
    template_region
    id
  }
`;

export namespace GQLProtocol {
  export namespace query {
    export const QUERY_MANY = gql`
      query MyQuery($ids: [uuid!]) {
        protocol_view(where: { study_id: { _in: $ids } }) {
          ...ProtocolFields
        }
      }
      ${FragmentProtocolFields}
    `;

    export const QUERY_ALL = gql`
      query MyQuery {
        protocol_view {
          description
          id
          name
          study_id
        }
      }
    `;

    export const queryAllTemplates = gql`
      query query_all_protocol_templates {
        protocol_template_view {
          ...ProtocolTemplateFields
        }
      }
      ${FragmentProtocolTemplateFields}
    `;

    export const QueryTemplateByRegion = gql`
      query query_protocol_template($regions: [String!]) {
        protocol_template_view(where: { template_region: { _in: $regions } }) {
          ...ProtocolTemplateFields
        }
      }
      ${FragmentProtocolTemplateFields}
    `;

    export const Query_Detail_Item = gql`
      query MyQuery($ids: [uuid!]) {
        protocol_detail_view(where: { id: { _in: $ids } }) {
          protocol_id
          id
          detail
        }
      }
    `;
    export interface FragmentProtocolResponse {
      __typename: string;
      id: string;
      name: string;
      study_id: string;
      description: string;
    }
    
    export interface Response {
      protocol_view: ReadonlyArray<FragmentProtocolResponse>;
    }

    export interface QueryManyVariables {
      ids: string[];
    }
    export interface QueryManyResponse {
      protocol_view: Array<RawGQLModel<Protocol>>;
    }
    export interface TempalteResponse {
      protocol_template_view: ReadonlyArray<RawGQLModel<ProtocolTemplate>>;
    }
    export interface RegionVarible {
      regions: ProtocolTemplateRegion[];
    }
  }
}
