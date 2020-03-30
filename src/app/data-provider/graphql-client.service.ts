import { Injectable } from "@angular/core";
import {
  OperationVariables,
  WatchQueryOptions,
  ApolloQueryResult
} from "apollo-client";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { HttpLink } from "apollo-angular-link-http";
import { Apollo } from "apollo-angular";

@Injectable({ providedIn: "root" })
export class GraphqlClientService {
  constructor(private httpLink: HttpLink, private apollo: Apollo) {}
  query<T, TVariables = OperationVariables>(
    options: WatchQueryOptions<TVariables>
  ): Observable<ApolloQueryResult<T>> {
    return this.apollo
      .watchQuery<T, TVariables>(options)
      .valueChanges.pipe(filter(x => x.data !== undefined));
    //   query(options: any): Observable<any> {
    // return this.apollo.watchQuery({ query: options }).valueChanges
    //   .pipe(filter(x => x.data !== undefined));
  }
}
// options里面：{query: xxx, variables:xxx}
