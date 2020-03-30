import gql from "graphql-tag";
import { StudyState, Study, Sex } from "src/app/model/study";
import { ConditionType } from "src/app/home/components/dashboard/dashboard.component";
import { User } from "src/app/model/user";

export namespace GQLStudy {
  export const FragmentStudyFieldsName = `StudyFields`;
  export const FragmentStudyFields = gql`
      fragment ${FragmentStudyFieldsName} on study_view {
        __typename
        id
        name
        sex
        height
        weight
        description
        patient_id
        operator_id
        state
        is_anonymous
      }
    `;
  export interface FragmentStudyFieldsResponse {
    __typename: string;
    id: string;
    name: string;
    sex: Sex;
    height: number;
    weight: number;
    state: StudyState;
    description: string;
    patient_id: string;
    operator_id: string;
    is_anonymous: boolean;
  }
  export namespace query {
    export interface ResponseOfConditionalQuery {
      study_view: Array<FragmentStudyFieldsResponse>;
    }
    export const Query = gql`
        query study_by_ids($ids: [uuid!]!) {
          study_view(where: { id: { _in: $ids } }) {
                ...${FragmentStudyFieldsName}
            }
        }
        ${FragmentStudyFields}
      `;
    export const QueryAll = gql`
        query study_all {
          study_view {
                ...${FragmentStudyFieldsName}
            }
        }
        ${FragmentStudyFields}
        `;
    const whereSegForState = (state: StudyState) =>
      `where:{state:{_eq:"${state}"}}`;

    const orderSeg = (order: "desc" | "asc") => {
      return `order_by:{name:${order}}`;
    };

    export const condtionalQuery = (condition: ConditionType) => {
      return gql`
            query MyQuery {
              study_view( ${orderSeg(condition.orderBy)} ,${
        condition.studyState ? whereSegForState(condition.studyState) : ""
      }) {
        id
        name
        sex
        height
        weight
        state
        description
        patient_id
        operator_id
        is_anonymous
              }
            }
          `;
    };
    export interface Variable {
      ids: Study["id"][];
    }
    export interface Response {
      study_view: Array<FragmentStudyFieldsResponse>;
    }
  }
}
