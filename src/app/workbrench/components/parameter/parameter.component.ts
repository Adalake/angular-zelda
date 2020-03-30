import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Inject,
  AfterViewInit
} from "@angular/core";
import { Scan } from "../workbrench/workbrench.component";
import { Observable, Subject, of, BehaviorSubject } from "rxjs";
import { ProtocolTemplate } from "src/app/model/protocol";
import { switchMap, map, tap, filter } from "rxjs/operators";
import { ScanService } from "src/app/data-provider/service/scan.service";
import { ProtocolService } from "src/app/data-provider/service/protocol.service";
import { ScanDataToken, IScanService } from "src/app/data-provider/share/store";

@Component({
  selector: "app-parameter",
  templateUrl: "./parameter.component.html",
  styleUrls: ["./parameter.component.less"],
  providers: [
    {
      provide: ScanDataToken,
      useClass: ScanService
    }
  ]
})
export class ParameterComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() selectedItem?: Scan;
  $dataSubject: Subject<Scan["id"]> = new Subject();
  readonly data$ = this.$dataSubject
    .asObservable()
    .pipe(switchMap(x => this.protocolService.queryProtocolDetail(x)));
  constructor(
    @Inject(ScanDataToken) private scanDataToken: IScanService,
    private protocolService: ProtocolService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.hasOwnProperty("selectedItem") &&
      !changes.selectedItem.firstChange
    ) {
      console.log(changes.selectedItem, "from parameter");
      this.$dataSubject.next(changes.selectedItem.currentValue);
    }
  }
  ngAfterViewInit(): void {
    if (!!this.selectedItem) {
      // 不然要点2次
      this.$dataSubject.next(this.selectedItem);
    }
  }

  selectedScan$ = this.$dataSubject.asObservable().pipe(
    switchMap(x => this.scanDataToken.queryMany(x)),
    map(x => {
      if (x[0]["scan_helical"].length || x[1]["scan_helical"].length) {
        return x[0]["scan_helical"][0];
      } else {
        return x[1]["scan_scout"][0];
      }
    }),
    tap(x => console.log(x, "test scan scout & helical"))
  );
  ngOnInit() {}
}
