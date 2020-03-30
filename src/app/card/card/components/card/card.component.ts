import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject
} from "@angular/core";
import { Study } from "src/app/model/study";
import { Patient } from "src/app/model/patient";
import { Router } from "@angular/router";
import {
  Observable,
  of,
  BehaviorSubject,
  from,
  combineLatest,
  interval
} from "rxjs";
import { switchMap, map, filter, first, tap } from "rxjs/operators";
import { PatientService } from "src/app/data-provider/service/patient.service";
import {
  IStudyService,
  StudyDataToken,
  PatientDataToken,
  IPatientDataService
} from "src/app/data-provider/share/store";
import { StudyService } from "src/app/data-provider/service/study.service";
import { headE } from "src/app/share/transaction";
interface StudyMeta {
  name: string;
  sex: string;
  description: string;
  studyState: string;
  state: string; // 是指patient表的state
}

export interface StudyMetaExport {
  patientId: any;
  studyId: any;
}

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"],
  providers: [
    { provide: StudyDataToken, useClass: StudyService },
    { provide: PatientDataToken, useClass: PatientService }
  ]
})
export class CardComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(StudyDataToken) private studyDataToken: IStudyService,
    @Inject(PatientDataToken) private patientDataToken: IPatientDataService // private patientService: PatientService // 比较这2种注入方式
  ) {}

  private _ids: BehaviorSubject<string> = new BehaviorSubject("");
  @Input()
  get ids(): string {
    return this._ids.value;
  }
  set ids(value: string) {
    this._ids.next(value);
  }
  @Output() cardClicked: EventEmitter<any> = new EventEmitter();
  studyInfo$: Observable<Study[]> = this._ids
    .asObservable()
    .pipe(switchMap(id => this.studyDataToken.queryMany(id))); // 要输出patient_id

  patientInfo$: Observable<Patient[]> = this.studyInfo$.pipe(
    map((x: any) => x[0].data.patient_id), // get pid
    switchMap(id => this.patientDataToken.queryMany(id))
  );
  dataExport: StudyMetaExport = {
    patientId: "",
    studyId: ""
  };
  data$: Observable<StudyMeta> = combineLatest(
    this.studyInfo$,
    this.patientInfo$
  ).pipe(
    map(([s, p]) => ({
      study: s,
      patient: p
    })),
    map(x => {
      this.dataExport = {
        studyId: x.study[0].id,
        patientId: x.patient[0].id
      }; // 获取到当前点击的pid和sid
      return {
        name: x.study[0].data.name,
        sex: x.study[0].data.sex,
        description: x.study[0].data.description,
        studyState: x.study[0].data.state,
        state: x.patient[0].data.state
      } as StudyMeta;
    })
  );

  ngOnInit() {
    // this.data$.subscribe(x => console.log(x, "------"));
  }

  toDetail() {
    this.cardClicked.emit(this.dataExport);
    this.router.navigate([
      `home/previous/${this.dataExport.patientId}/${this.dataExport.studyId}`
    ]);
  }
}
