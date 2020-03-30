import gql from "graphql-tag";
import { Patient, PatientState } from "src/app/model/patient";
import { RawGQLModel } from "../share/client";
import { ConditionType } from "src/app/home/components/dashboard/dashboard.component";
import { StudyState } from "src/app/model/study";
import { retry } from "rxjs/operators";

const FragmentPatientFields = `
    fragment PatientFields on patient_view {
      __typename
      id
      external_id
      name
      birthday
      study_ids
      state
    }
  `;
// export enum orderRule {
//   ASC = "asc",
//   DESC = "desc"
// }
export namespace GQLPatient {
  export namespace query {
    //    export const queryAllFields = gql`
    //       query myQuery {
    //         patient {
    //           birthday
    //           external_id
    //           name
    //           id
    //         }
    //       }
    //     `;
    const whereSegForState = (state: PatientState) =>
      `where:{state:{_eq:"${state}"}}`;

    const orderSeg = (order: "desc" | "asc") => {
      return `order_by:{name:${order}}`;
    };
    // patient(where: {state: {_eq: "invalid"}}, order_by: {name: asc})
    export const condtionalQuery = (condition: ConditionType) => {
      return gql`
        query MyQuery {
          patient( ${orderSeg(condition.orderBy)} ,${
        condition.state ? whereSegForState(condition.state) : ""
      }) {
            id
            name
            external_id
            birthday
            state
          }
        }
      `;
    };

    // export const _orderSeg = (x: orderRule.ASC) => {
    //   return `order_by:{name:${x}}`;
    // };
    // export const TESTGO = (x: ConditionType) => {
    //   return gql`
    //     query MyQuery {
    //         patient(order_by: {name: ${x.orderBy}}) {
    //           id
    //           name
    //           external_id
    //           birthday
    //         }
    //       }
    //     `;
    // };
    // export const TEST = gql`
    // query MyQuery {
    //     patient(order_by: {name: ${orderRule.ASC}}) {
    //       id
    //       name
    //       external_id
    //       birthday
    //     }
    //   }
    // `;
    export const QUERY_MANY = gql`
      query query_patient($ids: [uuid!]) {
        patient_view(where: { id: { _in: $ids } }) {
          ...PatientFields
        }
      }
      ${FragmentPatientFields}
    `;

    export const QUERY_ALL = gql`
      query query_patient {
        patient_view {
          ...PatientFields
        }
      }
      ${FragmentPatientFields}
    `;

    export interface QueryManyVariables {
      ids: string[];
    }
    export interface QueryManyResponse {
      patient_view: Array<RawGQLModel<Patient>>;
    }
  }
}
