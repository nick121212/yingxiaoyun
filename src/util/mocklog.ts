import { SinonSpy } from "sinon";
import { ILogger } from "./log";

export class MockLogger implements ILogger {

  constructor(private loggerSpy: SinonSpy) {
  }

  public info(msg: any) {
    this.loggerSpy(msg);
  }

  public warn(msg: any) {
    this.loggerSpy(msg);
  }

  public error(msg: any) {
    this.loggerSpy(msg);
  }
}
