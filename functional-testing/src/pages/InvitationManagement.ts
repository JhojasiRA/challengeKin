import {Action} from '../globalTasks/Action';

export class Organization extends Action {
    get resendButton() { return browser.$('//*[@role="row"]/child::*[contains(text(),"Active")]/following::*[contains(text(),"RESEND")]');}
    get cancelButton() { return browser.$('//*[@role="row"]/child::*[contains(text(),"Active")]/following::*[contains(text(),"CANCEL")]');}
    get okButton() { return browser.$('//*[contains(@id, "mat-dialog")]//button');}

    public async resendActiveInvitation(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.resendButton);
        await this.click(this.okButton);
      }
    
      public async cancelActiveInvitation(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.cancelButton);
        await this.click(this.okButton);
      }

}