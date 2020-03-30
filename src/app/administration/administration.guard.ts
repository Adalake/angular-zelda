import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { PatientService } from "../data-provider/service/patient.service";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  isOccupied: boolean = false;
  constructor() {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> {
    // return new Promise(resolve => {
    //   const id = route.params["patientId"];
    //   if (id) {
    //     this.patientService.queryMany(id).subscribe(x => {
    //       if (x[0]["data"]["state"] === PatientState.valid) {
    //         resolve(true);
    //       } else {
    //         resolve(false);
    //       }
    //     });
    //     console.log(id, "???");
    //   }
    // });
    return new Promise((resolve, reject) => {
      resolve(!this.isOccupied);
      reject(console.log("请停止当前控制"));
      console.log(this.isOccupied);
    });
  }
}
// console.log(route.params["patientId"]) // 这个id永远都是点击时候预设的那个
