import { Action } from '../globalTasks/Action'

const ROLE_IN_MODAL = (role: string) => `//*[@class='mat-button-toggle-label-content' and text()='${role}']`
export class ApproveUser extends Action {
  get dismmissButton() { return $("//*[ contains (text(), 'DISMISS')]") }
  get messageDismissUser() { return $("//*[@id='mat-dialog-0']//*[contains(@class,'modal-body')]") }
  get dismissUserMessage() { return $("//*[@id='mat-dialog-0']//button[ contains (text(), 'Dismiss')]") }
  get approveButton() { return $("//*[contains(text(), 'APPROVE') and not(@disabled)]") }
  get saveButton() { return $("//button[contains(text(), 'Save')]") }
  get userApprovedMessage() { return $("//*[contains(text(), 'User has been approved.')]")}


  public async Dismiss(): Promise<void> {
    //global.lastError = 'Dismiss button was not located'
    await this.click(this.dismmissButton);
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
    const roleInModal = await $(ROLE_IN_MODAL(role))
    await this.click(roleInModal)
    await this.click(this.saveButton)
  }
}