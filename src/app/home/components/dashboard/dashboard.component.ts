import {
  Component,
  OnInit,
  OnDestroy,
  InjectionToken,
  Inject
} from "@angular/core";
import { PatientService } from "src/app/data-provider/service/patient.service";
import { Subject, Observable, zip, of, interval, range } from "rxjs";
import { StudyState, Study } from "src/app/model/study";
import {
  switchMap,
  first,
  takeUntil,
  map,
  take,
  concatAll
} from "rxjs/operators";
import { Patient, PatientState } from "src/app/model/patient";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";
import { StudyService } from "src/app/data-provider/service/study.service";

export interface ConditionType {
  orderBy: "asc" | "desc";
  // limit?: number;
  // OrderByType: "time" | "age" | "name";
  state?: PatientState;
  studyState?: StudyState;
}
export interface StudyRichQuery {
  queryBy: (condtion: ConditionType) => Observable<Patient["id"]>;
  queryAll: () => Observable<Study[]>;
}

export const studyRichQueryToken = new InjectionToken<StudyRichQuery>(
  "studyRichQuery"
);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"],
  providers: [{ provide: studyRichQueryToken, useClass: StudyService }]
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    @Inject(studyRichQueryToken) private studyRichQuery: StudyRichQuery
  ) {}
  ngOnDestroy(): void {
    this.$onDestroy.next();
  }

  idsOfUnstarted: any;
  idsOfClosed: any;

  $onDestroy: Subject<any> = new Subject();
  $SortCard: Subject<any> = new Subject<any>();

  $patient = new Subject();
  patient$ = this.$patient.asObservable();
  ngOnInit() {
    this.studyRichQuery.queryBy({
      orderBy: "desc",
      studyState: StudyState.Closed
    });

    this.$SortCard
      .asObservable()
      .pipe(
        switchMap(() =>
          zip(
            this.studyRichQuery.queryBy({
              orderBy: "asc",
              studyState: StudyState.Unstarted
            }),
            this.studyRichQuery.queryBy({
              orderBy: "asc",
              studyState: StudyState.Closed
            })
          ).pipe(first())
        ),
        takeUntil(this.$onDestroy)
      )
      .subscribe(([x, y]) => {
        this.idsOfUnstarted = x;
        this.idsOfClosed = y;
      });

    this.$SortCard.next({ orderBy: "asc" });
  }
  // sort() {
  //   return this.studyRichQuery
  //     .queryBy({
  //       orderBy: "desc"
  //     })
  //     .subscribe(x => {
  //       console.log(x);
  //     });  
  // }

  onItemClick(x: { data: any; belongTo: string }) {
    console.log(x.data, x.belongTo);
    if (x.belongTo === "previous") {
      this.router.navigate(["home/previous", x.data]);
    } else {
      this.router.navigate(["home/posterior", x.data]);
    }
  }
}
