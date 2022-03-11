import { Action } from '../globalTasks/Action';

export class ExternalAccount extends Action {

    get userNameField() { return $("#userNameInput")} 
    get passwordField() { return $("#passwordInput")}
    get userNameTextBox() { return $("#username")}
    get passwordTextBox() { return $("#password")}

  public async submitForm(username:string, password:string): Promise<void> {
    await browser.pause(3000);
    var currentUrl = await browser.getUrl();
    if (currentUrl.includes('idp.rockwellautomation.com')) {
      await this.enterText(this.userNameField, username);
      await this.enterText(this.passwordField, password);
      await browser.keys("\uE007")
    } else {
      await this.enterText(this.userNameTextBox, username);
      await this.enterText(this.passwordTextBox, password);
      await browser.keys("\uE007")
    }
  }
}


