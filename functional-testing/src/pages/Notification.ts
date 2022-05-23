import {Action} from '../globalTasks/Action';

export class Notification extends Action {
    get notificacionIcon() { return browser.$('//*[@class= "ra-icon-ide-sm-alarm ra-common-icon"]');}
    get removeNotificationOption() { return browser.$('(//*[@class="ra-icon-ide-sm-close"])[1]');}
    get deleteButton() { return browser.$('//*[contains(text(), " DELETE")]');}
    get removeNotifiationModal() { return browser.$('//*[@id ="mat-dialog-1"]');}

    get clearMessageNotification() { return browser.$('//*[contains(text(), "All Clear")]');}
    

    public async icon(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.notificacionIcon);
      }

    public async removeNotification(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.removeNotificationOption);
       // await this.removeNotifiationModal.waitForDisplayed({ timeout: global.intElementsTimeout })
        await this.click(this.deleteButton);
        await browser.pause(2000);
      }
    }


    