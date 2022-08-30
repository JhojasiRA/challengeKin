import pause from 'webdriverio/build/commands/browser/pause'
import { Action } from '../globalTasks/Action'

const ROLE_IN_MODAL = (role: string) => `//*[@class='mat-button-toggle-label-content' and text()='${role}']`
export class ApproveUser extends Action {
  get dismissButton() { return $("//*[ contains (text(), 'DISMISS')]") }
  get messageDismissUser() { return $("//*[ contains (text(), 'User request to join your organization will be dismissed.')]") }
  get dismissUserMessage() { return $("//*[ contains (text(), 'Dismiss')]") }
  get approveButton() { return $("//*[contains(text(), 'APPROVE') and not(@disabled)]") }
  get saveButton() { return $("//*[contains(text(), 'Save')]") }
  get userApprovedMessage() { return $("//*[contains(text(), 'User has been approved.')]")}
  get dismissButton3() { return $("//*[ contains (text(), 'Access request dismissed. ')]") }
  


  public async Dismiss(): Promise<void> {
    //global.lastError = 'Dismiss button was not located'
    await this.click(this.dismissButton);
  }
  public async DismissButton(): Promise<void> {
    //global.lastError = 'Dismiss user message was not located'
    await this.click(this.dismissUserMessage);
  }
  public getMessageDismissRequest(): WebdriverIO.Element {
    return this.messageDismissUser;
  }

  public async approveJoinRequest(role: string) {
    await this.click(this.approveButton)
    await browser.pause(3000);
    const roleInModal = await $(ROLE_IN_MODAL(role))
    await this.click(roleInModal)
    await browser.pause(3000);
    await this.click(this.saveButton)
    await browser.pause(3000);
  }
}