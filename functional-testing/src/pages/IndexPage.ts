import { Action } from "../globalTasks/Action";

export class IndexPage extends Action {
  get signInButton() {
    return $('//button[@id="sign-in-button"]');
  }
  get companyLogo() {
    return $('//*[@id="companyLogo"]');
  }
  get instructionLogOut() {
    return $('//*[@id="instruction"]');
  }
  get VaultCard() {
    return $('//*[@id="card-Vault"]');
  }
  get FTRACard() {
    return $('//*[@id="card-SecureRemoteAccess"]');
  }
  get DesignStudioCard() {
    return $('//*[@id="card-IDE"]');
  }
  get FooCard() {
    return $('//*[@id="card-FooService"]');
  }

  public async goToSignIn(): Promise<void> {
    await this.click(this.signInButton);
  }

  public getLogOutPage(): WebdriverIO.Element {
    return this.signInButton;
  }
  public getCompanyLogo(): WebdriverIO.Element {
    return this.companyLogo;
  }

  public getInstructionLogOut(): WebdriverIO.Element {
    return this.instructionLogOut;
  }


}
