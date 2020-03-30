import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject, of } from "rxjs";
import { switchMap, map, takeUntil } from "rxjs/operators";
import {
  studyRichQueryToken,
  StudyRichQuery
} from "src/app/home/components/dashboard/dashboard.component";
import { StudyState } from "src/app/model/study";
import { StudyService } from "src/app/data-provider/service/study.service";
import { headE } from "src/app/share/transaction";

@Component({
  selector: "app-titlebar",
  templateUrl: "./titlebar.component.html",
  styleUrls: ["./titlebar.component.less"],
  providers: [{ provide: studyRichQueryToken, useClass: StudyService }]
})
export class TitlebarComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(studyRichQueryToken) private studyRichQuery: StudyRichQuery
  ) {}
  ngOnDestroy(): void {
    this.$onDestory.next();
  }
  $turnToAdmin: Subject<any> = new Subject();
  turnToAdmin$ = this.$turnToAdmin.asObservable();
  toAdmin() {
    this.router.navigate(["administration"]);
  }
  toWorkbrench() {
    this.$turnToAdmin.next();
  }
  $onDestory = new Subject();
  ngOnInit() {
    // this.route.root.firstChild
    //   ? this.route.root.firstChild.url
    //       .pipe(map(headE))
    //       .subscribe(x => console.log("titlebar", x))
    //   : of(null).subscribe(x => console.log("titlebar", x));

    this.turnToAdmin$
      .pipe(
        switchMap(() =>
          this.studyRichQuery.queryBy({
            orderBy: "asc",
            studyState: StudyState.Closed
          })
        ),
        takeUntil(this.$onDestory)
      )
      .subscribe((x: any) => {
        this.router.navigate([`workbrench/${x}`]);
      });
  }
}

// Our AppComponent is a non-routed component and can only get direct access to global stuff like queryParams and fragment but not to the route specific path params…
