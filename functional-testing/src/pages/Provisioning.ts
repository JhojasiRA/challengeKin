import { allowedNodeEnvironmentFlags } from "process";
import { Action } from "../globalTasks/Action";
import { provisioning } from '../../support/Hooks';

export class Provisioning extends Action {
    
get provisioningLogo() {return browser.$('//button[@class="mat-focus-indicator mat-button mat-button-base ft-logo ft-hub logo-only"]');}

    public getProvisioningLogo(): WebdriverIO.Element {
      return this.provisioningLogo;
  }
  
}