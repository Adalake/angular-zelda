import { Component, OnInit, Inject } from "@angular/core";
import {
  ActivatedRoute,
  ParamMap,
  ActivatedRouteSnapshot,
  Router
} from "@angular/router";
import { switchMap, map, filter, first } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { Study } from "src/app/model/study";
import {
  ProtocolDataToken,
  IProtocolService
} from "src/app/data-provider/share/store";
import { ProtocolService } from "src/app/data-provider/service/protocol.service";
import { StudyMetaExport } from "src/app/card/card/components/card/card.component";
import { headE } from "src/app/share/transaction";
import {
  ProtocolTemplate,
  ProtocolTemplateRegion
} from "src/app/model/protocol";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.less"],
  providers: [{ provide: ProtocolDataToken, useClass: ProtocolService }]
})
export class PageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private protocolService: ProtocolService,
    @Inject(ProtocolDataToken) private protocolDataToken: IProtocolService
  ) {}
  // protocolListView$ = this.protocolListViewConstructor$(this.studyId);
  // protocolListViewConstructor$(studyId: Study["id"] | undefined) {}
  regions = [
    {
      name: ProtocolTemplateRegion.Head
    },
    {
      name: ProtocolTemplateRegion.Neck
    },
    {
      name: ProtocolTemplateRegion.Abdomen
    }
  ];
  idBundle: StudyMetaExport = {
    patientId: "",
    studyId: ""
  };
  idBundle$: Observable<StudyMetaExport> = this.route.paramMap.pipe(
    filter(p => !!p.get("studyId") && !!p.get("patientId")),
    map(
      p =>
        (this.idBundle = {
          patientId: p.get("patientId"),
          studyId: p.get("studyId")
        } as StudyMetaExport)
    )
  );

  // protocol$ = this.idBundle$.pipe(
  //   switchMap(x => this.protocolDataToken.queryMany(x.studyId)),
  //   map(x => x["data"]["protocol_view"][0])
  // );

  template$: Observable<
    ProtocolTemplate[]
  > = this.protocolService.queryAllTemplates();

  ngOnInit() {
    // this.idBundle$.subscribe(params => {
    //   console.log(params);
    // });
  }
  selectedRegions$: any;
  protocolByRegion(x: any) {
    this.selectedRegions$ = this.protocolService.queryTemplateByRegion(x);
    // .pipe(map((x: Array<any>) => x.map(x => x.data)));

    // this.protocolService
    //   .queryTemplateByRegion(x)
    //   .pipe(map((x: Array<any>) => x.map(x => x.data)))
    //   .subscribe(x => {
    //     console.log(x);
    //     this.selectedRegion = x;
    //   });
  }
  toWorkbrench() {
    this.router.navigate([`workbrench/${this.idBundle.studyId}`]);
  }
  selectedItemKey: string = "SELECTED_ITEM";
  toProtocolSelected(id: string, select: boolean) {
    let sessionItem: string[] = [];
    const selectProtocol = sessionStorage.getItem(this.selectedItemKey);
    if (selectProtocol !== null && selectProtocol) {
      sessionItem = JSON.parse(selectProtocol);
    }
    !!select
      ? sessionItem.push(id)
      : sessionItem.splice(sessionItem.indexOf(id), 1);
    sessionStorage.setItem(this.selectedItemKey, JSON.stringify(sessionItem));
    console.log(sessionItem);
  }

  addToDB() {
    const selectProtocol = sessionStorage.getItem(this.selectedItemKey);
    let selectedProtocol: string[] = [];
    selectedProtocol = JSON.parse(selectProtocol);
    selectedProtocol.forEach(item => {
      this.protocolService.duplicateProtocolTemplate(
        item,
        this.idBundle.studyId,
        "test name字段"
      ); // duplicateProtocolTemplate参数2：当前的studyId
    });
    sessionStorage.removeItem(this.selectedItemKey);
  }
}
// 第一步，从路由获取到studyId和patientId
// 当page页面接收到路由流的时候，就展示 protocol-menu,
