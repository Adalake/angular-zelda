import { Injectable } from "@angular/core";
import { GraphqlClientService } from "../graphql-client.service";
import { map, first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Scan, ScanTypes } from "src/app/model/scan";
import { GQLScan } from "../query/scan";
import { StoreService } from "../share/store";

@Injectable({ providedIn: "root" })
export class ScanService implements StoreService<Scan> {
  constructor(private gql: GraphqlClientService) {}
  queryProtocolItem(...ids: string[]) {
    console.log(ids);
    return this.gql
      .query({
        query: GQLScan.query.QueryItem,
        variables: { ids }
      })
      .pipe(map(r => r.data["protocol_item_view"]));
  }

  queryMany(...ids: Scan["id"][]) {
    return this.gql
      .query<GQLScan.query.Response, GQLScan.query.Variable>({
        query: GQLScan.query.Query,
        variables: { ids }
      })
      .pipe(
        first(),
        map(r => r.data["protocol_item"])
      );
  }
}
