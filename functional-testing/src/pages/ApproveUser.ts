import {Action} from '../globalTasks/Action'


export class ApproveUser extends Action {
    get dismmissButton () { return $("//*[ contains (text(), 'DISMISS')]")}
    get messageDismissUser () { return $("//*[@id='mat-dialog-0']//*[contains(@class,'modal-body')]")}
    get dismissUserMessage () { return $("//*[@id='mat-dialog-0']//button[ contains (text(), 'Dismiss')]")}

  
  public async Dismiss(): Promise<void> {
    //global.lastError = 'Dismiss button was not located'
    await this.click(this.dismmissButton);
  }
  public async DismissButton(): Promise<void> {
    //global.lastError = 'Dismiss user message was not located'
    await this.click(this.dismissUserMessage);
  }
  public getMessageDismissRequest(): WebdriverIO.Element{
    return this.messageDismissUser;
  }
}