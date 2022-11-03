import {Action} from '../globalTasks/Action';

export class InvitationManagement extends Action {
    get resendButton() { return browser.$('//*[@role="row"]/child::*[contains(text(),"Active")]/following::*[contains(text(),"Resend")]');}
    //get cancelButton() { return browser.$('//*[@role="row"]/child::*[contains(text(),"Active")]/following::*[contains(text(),"delete")]');}
    get cancelButton() { return browser.$('(//*[@class="ra-icon-ide-sm-delete"])[1]');}
    get okButton() { return browser.$('//*[contains(@id, "mat-dialog")]//button');}
    get DeleteButton() { return browser.$('//*[contains(text(),"Delete")]');}
    

    public async resendActiveInvitation(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.resendButton);
        await this.click(this.okButton);
      }
    
      public async cancelActiveInvitation(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.cancelButton);
        await this.click(this.DeleteButton);
      }

}