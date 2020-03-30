import { Component, OnInit, Inject } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable, pipe } from "rxjs";
import { PatientService } from "./data-provider/service/patient.service";
import { StudyService } from "./data-provider/service/study.service";
import {
  studyRichQueryToken,
  StudyRichQuery
} from "./home/components/dashboard/dashboard.component";
import { ProtocolService } from "./data-provider/service/protocol.service";
import { ProtocolTemplateRegion } from "./model/protocol";
import { ScanService } from "./data-provider/service/scan.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  providers: [{ provide: studyRichQueryToken, useClass: PatientService }]
})
export class AppComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private patientService: PatientService,
    private studyService: StudyService,
    private protocolService: ProtocolService,
    private scanService: ScanService,
    @Inject(studyRichQueryToken) private studyRichQuery: StudyRichQuery
  ) {}
  data: Observable<any>;
  testQueryPatient(id = "5d07f55a-8fc9-4dd0-9fe6-91fbeedff8b9") {
    this.patientService.queryMany(id).subscribe(
      x => console.log("query patient-- ", x[0]["data"]["state"]),
      e => console.error(e)
    );
  }

  testAllStudy() {
    // this.studyService.queryAll().subscribe(x => console.log(x));
    this.studyService
      .queryMany("e950dc78-d2d5-405f-ba18-4f74c2e5316c")
      .subscribe(x => console.log(x[0]["data"]["state"])); // Unstarted
  }

  queryAll() {
    this.scanService
      .queryMany("13a04606-0601-4e48-9970-e9c84f2e1daa")
      .pipe(
        map(x => {
          if (x[0]["scan_helical"].length || x[1]["scan_helical"].length) {
            return x[0]["scan_helical"];
          } else {
            return x[1]["scan_scout"];
          }
        })
      )
      .subscribe(x => console.log(x, "gigi"));
  }
  ngOnInit() {}
  title = "zelda";
}
