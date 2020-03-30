import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-statebar",
  templateUrl: "./statebar.component.html",
  styleUrls: ["./statebar.component.less"]
})
export class StatebarComponent implements OnInit {
  constructor() {}
  currentHour$ = interval(1000).pipe(
    map(() => new Date()),
    map(d => ({
      hour: d.getHours()
    })),
    map(x => {
      if (x.hour < 10) {
        return "0" + x.hour;
      } else {
        return x.hour;
      }
    })
  );

  currentMinute$ = interval(1000).pipe(
    map(() => new Date()),
    map(d => ({
      minute: d.getMinutes()
    })),
    map(x => {
      if (x.minute < 10) {
        return "0" + x.minute;
      } else {
        return x.minute;
      }
    })
  );

  currenDate$ = interval(1000).pipe(map(() => new Date().toLocaleDateString()));

  ngOnInit() {}
}
