import { Injectable } from "@angular/core";
import { StoreService, RichQueryStore } from "../share/store";
import { Study, StudyType } from "src/app/model/study";
import {
  StudyRichQuery,
  ConditionType
} from "src/app/home/components/dashboard/dashboard.component";
import { Observable } from "rxjs";
import { GraphqlClientService } from "../graphql-client.service";
import { GQLPatient } from "../query/patient";
import { tap, map } from "rxjs/operators";
import { GQLStudy } from "../query/study";

@Injectable({ providedIn: "root" })
export class StudyService
  implements StoreService<Study>, RichQueryStore<Study> {
  constructor(private gql: GraphqlClientService) {}
  // queryMany(...ids: string[]): Observable<Study[]> {
  //     throw new Error("Method not implemented.");
  // }
  //   study_view表还没有建 TODO
  queryMany(...ids: string[]): Observable<Study[]> {
    return this.gql
      .query<GQLStudy.query.Response, GQLStudy.query.Variable>({
        query: GQLStudy.query.Query,
        variables: { ids }
      })
      .pipe(map(r => readQueryResponse(r.data)));
  }

  queryAll(): Observable<Study[]> {
    return this.gql
      .query<GQLStudy.query.Response, {}>({
        query: GQLStudy.query.QueryAll,
        variables: {}
      })
      .pipe(map(r => readQueryResponse(r.data)));
  }

  queryBy(conditionType: ConditionType): Observable<any> {
    return this.gql
      .query({
        query: GQLStudy.query.condtionalQuery(conditionType)
      })
      .pipe(map(r => (r["data"]["study_view"] as Array<any>).map(x => x.id)));
  }
}
export function readQueryResponse(response: GQLStudy.query.Response): Study[] {
  return response.study_view.map(r => {
    const { id, __typename, ...data } = r;
    return {
      __typename: StudyType,
      id,
      data,
      relation: {}
    } as Study;
  });
}
