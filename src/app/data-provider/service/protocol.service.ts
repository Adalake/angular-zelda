import { Injectable } from "@angular/core";
import { GraphqlClientService } from "../graphql-client.service";
import { Observable } from "rxjs";
import { Study } from "src/app/model/study";
import { map } from "rxjs/operators";
import { readQueryResponse } from "./study.service";
import { GQLProtocol } from "../query/protocol";
import {
  ProtocolTemplate,
  ProtocolTemplateTtype,
  Protocol
} from "src/app/model/protocol";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "src/app/share/config";
import { Scan, ScanScoutItem } from "src/app/model/scan";
import { StoreService, RichQueryStore } from "../share/store";

@Injectable({ providedIn: "root" })
export class ProtocolService
  implements StoreService<Protocol>, RichQueryStore<Protocol> {
  constructor(private gql: GraphqlClientService, private http: HttpClient) {}
  queryMany(...ids: string[]): Observable<any> {
    return this.gql.query<
      GQLProtocol.query.QueryManyResponse,
      GQLProtocol.query.QueryManyVariables
    >({
      query: GQLProtocol.query.QUERY_MANY,
      variables: { ids }
    });
    //   .pipe(map(r => readQueryResponse(r.data)));
  }
  
  queryAll(): Observable<any> {
    return this.gql.query<GQLProtocol.query.Response, {}>({
      query: GQLProtocol.query.QUERY_ALL,
      variables: {}
    });
  }

  queryAllTemplates() {
    return this.gql
      .query<GQLProtocol.query.TempalteResponse, {}>({
        query: GQLProtocol.query.queryAllTemplates,
        variables: {}
      })
      .pipe(map(r => readQueryTemplateResponse(r.data)));
  }

  queryTemplateByRegion(
    ...regions: ProtocolTemplate["data"]["template_region"][]
  ): Observable<ProtocolTemplate[]> {
    console.log(regions);
    return this.gql
      .query<
        GQLProtocol.query.TempalteResponse,
        GQLProtocol.query.RegionVarible
      >({
        query: GQLProtocol.query.QueryTemplateByRegion,
        variables: { regions }
      })
      .pipe(map(r => readQueryTemplateResponse(r.data)));
  }
  // queryProtocolItem(...ids: string[]) {
  //   console.log(ids);
  //   return this.gql
  //     .query({
  //       query: GQLProtocol.query.Query_Protocol_Item,
  //       variables: { ids }
  //     })
  //     .pipe(map(r => r.data["protocol_item_view"]));
  // } scan

  // Query_Detail_Item
  queryProtocolDetail(...ids: string[]) {
    console.log(ids);
    return this.gql
      .query({
        query: GQLProtocol.query.Query_Detail_Item,
        variables: { ids }
      })
      .pipe(map(r => r.data["protocol_detail_view"]));
  }

  // queryScanItem(...ids: Scan["id"][]) {
  //   return this.gql.query({
  //     query: GQLProtocol.query.Query_Scan_Item,
  //     variables: { ids }
  //   });
  //   // .pipe(first(),map(r => readQueryAndSubResponse(r.data)));
  // } scan

  //  duplicateProtocolTemplate
  duplicateProtocolTemplate(
    protocol_template_id: string,
    study_id: string,
    name: string
  ) {
    console.warn(
      "restful api of duplicateProtocolTemplate:",
      protocol_template_id,
      study_id,
      name
    );
    return this.http.post(baseUrl + "/duplicateProtocolTemplate", {
      protocol_template_id,
      study_id,
      name
    });
  }
}

export function readQueryTemplateResponse(
  response: GQLProtocol.query.TempalteResponse
): ProtocolTemplate[] {
  return response.protocol_template_view.map(r => {
    const { __typename, id, ...data } = r;
    return {
      __typename: ProtocolTemplateTtype,
      id,
      data
    } as ProtocolTemplate;
  });
}
