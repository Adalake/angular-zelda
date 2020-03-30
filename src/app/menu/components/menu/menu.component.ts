import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  Inject
} from "@angular/core";
import { Study } from "src/app/model/study";
import { Observable, of, from } from "rxjs";
import {
  ProtocolDataToken,
  IProtocolService
} from "src/app/data-provider/share/store";
import { ProtocolService } from "src/app/data-provider/service/protocol.service";
import { map, switchMap, tap } from "rxjs/operators";
import { Scan } from "src/app/workbrench/components/workbrench/workbrench.component";
import { ScanService } from "src/app/data-provider/service/scan.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.less"],
  providers: [{ provide: ProtocolDataToken, useClass: ProtocolService }]
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() selectItem?: (item: Scan) => void;
  itemSelected: Scan = {
    id: "",
    data: "",
    relation: "",
    __typename: "anything"
  };

  onSelected(selectedItem: Scan) {
    console.log(selectedItem, "from menu");
    this.itemSelected = selectedItem;
    !!this.selectItem ? this.selectItem(this.itemSelected) : null;
  }
  // 以上是选中的protocol-item,传到workbrench
  @Input() showInWorkbrench: boolean = false;
  @Input() studyId: any;
  constructor(
    private scanService: ScanService,
    @Inject(ProtocolDataToken) private protocolDataToken: IProtocolService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("studyId")) {
      this.protocolListView$ = this.protocolListViewConstructor$(
        changes.studyId.currentValue
      );
      this.protocolItemView$ = this.protocolItemConstructor$(
        changes.studyId.currentValue
      );
    }
  }

  protocolItemView$ = this.protocolItemConstructor$(this.studyId);
  protocolItemConstructor$(studyId: Study["id"] | undefined) {
    return !!studyId
      ? this.protocolDataToken.queryMany(studyId).pipe(
          map(x => x["data"]["protocol_view"]),
          map(x => (x as Array<any>).map(x => x.id)),
          switchMap(x => this.scanService.queryProtocolItem(x[0])),
          map(x => x[0]["protocol_item_ids"])
        )
      : new Observable<never>();
    // 报错：一个studyId只有1个protocol时
  }
  protocolListView$ = this.protocolListViewConstructor$(this.studyId);
  protocolListViewConstructor$(studyId: Study["id"] | undefined) {
    return !!studyId
      ? this.protocolDataToken.queryMany(studyId).pipe(
          map(x => x["data"]["protocol_view"]),
          tap(x =>
            console.log(
              x,
              // (x as Array<any>).map(x => x.id),
              "get protocol id"
            )
          )
        )
      : new Observable<never>();
  }

  ngOnInit() {}
}

// 传入这个组件的是studyId
// 得到studyId对应的protocolId，这里有2个 TODO
// 得到protocolId对应的protocol-itemId
