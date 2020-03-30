import { AdminGuard } from "./administration.guard";

export class BaseAdmin {
  constructor(private adminGuard: AdminGuard) {}

  start() {
    this.adminGuard.isOccupied = true;
  }

  stop() {
    this.adminGuard.isOccupied = false;
  }
}
