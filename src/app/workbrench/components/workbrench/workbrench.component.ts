import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  Inject
} from "@angular/core";
import { ProtocolService } from "src/app/data-provider/service/protocol.service";
import { Observable, Subject } from "rxjs";
import { ProtocolTemplate } from "src/app/model/protocol";
import { tap, map, switchMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import {
  StudyDataToken,
  IStudyService
} from "src/app/data-provider/share/store";
import { StudyService } from "src/app/data-provider/service/study.service";
export type Scan = {
  id: any;
  data: any;
  relation: any;
  __typename: string;
};
@Component({
  selector: "app-workbrench",
  templateUrl: "./workbrench.component.html",
  styleUrls: ["./workbrench.component.less"],
  providers: [
    {
      provide: StudyDataToken,
      useClass: StudyService
    }
  ]
})
export class WorkbrenchComponent implements OnInit, DoCheck {
  readonly emptyItem = {
    id: "",
    data: {},
    relation: {},
    __typename: "ScanScout"
  } as Scan;
  constructor(
    private activateRoute: ActivatedRoute,
    private studyService: StudyService,
    @Inject(StudyDataToken) private studyDataToken: IStudyService
  ) {}
  $selectedSubject: Subject<Scan> = new Subject();
  selectedItem$?: Observable<Scan> = this.$selectedSubject
    .asObservable()
    .pipe(tap(x => console.log("asdasdasds", x)));

  lastSelectedItem?: Scan;
  selectedItem: Scan = this.emptyItem;
  ngDoCheck(): void {
    if (this.lastSelectedItem !== this.selectedItem) {
      this.$selectedSubject.next(this.selectedItem);
      this.lastSelectedItem = this.selectedItem;
      console.log(this.lastSelectedItem, "___last selected");
    }
  }
  selectItem() {
    return (item: any) => {
      this.selectedItem = item;
      console.log(item, "selectItem from workbrench");
    };
  }
  // 以下是获取studyId
  studyView$ = this.studyViewConstructor$();
  studyViewConstructor$() {
    return this.activateRoute.paramMap
      .pipe(map(params => params.get("studyId")))
      .pipe(
        switchMap(x => this.studyDataToken.queryMany(x)),
        map(x => x[0]["id"])
      );
  }
  ngOnInit() {}
}
