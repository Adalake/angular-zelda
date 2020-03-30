import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Scan } from "../workbrench/workbrench.component";
import { Subject, of } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.less"]
})
export class DetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
