import { Injectable, Inject } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import {
  studyRichQueryToken,
  StudyRichQuery
} from "../home/components/dashboard/dashboard.component";
import { StudyService } from "../data-provider/service/study.service";
import { first } from "rxjs/operators";
import { StudyState } from "../model/study";

@Injectable({ providedIn: "root" })
export class WorkbrenchRouteGard implements CanActivate {
  constructor(private studyService: StudyService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const id = route.params.studyId;
    return new Promise(r => {
      if (!!id) {
        this.studyService
          .queryMany(id)
          .pipe(first())
          .subscribe(result =>
            r(result[0]["data"]["state"] === StudyState.Closed)
          );
          console.log(id)
      } else {
          console.log('failed')
      }
    });
  }
}
// 如果当前URL的studyId对应的state为Closed，canActivate的为真，否则为假
