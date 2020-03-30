import { Injectable } from "@angular/core";
import { GraphqlClientService } from "../graphql-client.service";
import { Patient, PatientType } from "src/app/model/patient";
import { Observable } from "rxjs";
import { GQLPatient } from "../query/patient";
import { tap, map, distinctUntilChanged } from "rxjs/operators";
import { StoreService, RichQueryStore } from "../share/store";
import { RawGQLModel, readRawModel } from "../share/client";
import { ConditionType } from "src/app/home/components/dashboard/dashboard.component";

@Injectable({ providedIn: "root" })
export class PatientService
  implements StoreService<Patient>, RichQueryStore<Patient> {
  constructor(private gql: GraphqlClientService) {}
  queryAll(): Observable<Patient[]> {
    // throw new Error("Method not implemented.");
    return this.gql
      .query<GQLPatient.query.QueryManyResponse, {}>({
        query: GQLPatient.query.QUERY_ALL,
        variables: {}
      })
      .pipe(map(r => r.data.patient_view.map(readQueryResult)));
  }
  queryMany(...ids: Patient["id"][]): Observable<Patient[]> {
    return this.gql
      .query<
        GQLPatient.query.QueryManyResponse,
        GQLPatient.query.QueryManyVariables
      >({ query: GQLPatient.query.QUERY_MANY, variables: { ids } })
      .pipe(
        tap(x => console.log(x)),
        map(d => {
          if (!!d.data) return d.data.patient_view;
          else throw Error(`[response is undefined]`);
        }),
        map(r => r.map(readQueryResult))
        // distinctUntilChanged(cmpArrayById)
      );
  }

  //   queryMany(): Observable<any> {
  //     return this.gql.query(GQLPatient.query.queryAllFields).pipe(
  //       tap(x => console.log(x)),
  //       map(d => {
  //         if (!!d) return d;
  //         else throw Error(`[response is undefined]`);
  //       })
  //     );
  //   }
}

export function readQueryResult(r: RawGQLModel<Patient>): Patient {
  return {
    ...readRawModel(r),
    __typename: PatientType,
    relation: {}
  };
}
