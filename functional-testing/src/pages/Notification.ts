import {Action} from '../globalTasks/Action';

export class Notification extends Action {
    get notificacionIcon() { return browser.$('//*[@class= "ra-icon-ide-sm-alarm ra-common-icon"]');}
    get removeNotificationOption() { return browser.$('(//*[@class="mat-tooltip-trigger ra-icon-ide-sm-close"])[1]');}
    get deleteButton() { return browser.$('//*[contains(text(), " DELETE")]');}
    get clearAllPanelNotifications() { return browser.$('//*[contains(text(), " Clear All ")]');}
    get viewAllButton() { return browser.$('//*[contains(text(), " View All ")]');}
    get deleteAllNotificationsOption() { return browser.$('//*[contains(text(), "DELETE ALL")]');}
    get clearButton() { return browser.$('//*[contains(text(), "CLEAR")]');}
    get trashIcon() { return browser.$('(//*[@class="ra-icon-ide-sm-delete close-notification"])[1]');}
    get allClearMessage() { return browser.$('//*[contains(text(), "All Clear")]');}

    public async icon(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.notificacionIcon);
      }

    public async removeNotificationFromPanel(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.removeNotificationOption);
        await this.click(this.deleteButton);
      }
    public async clearAllNotificationsFromPanel(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.clearAllPanelNotifications);
        await this.click(this.clearButton);
      }
    public async deleteAllNotificationsFromViewPage(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.viewAllButton);
        await browser.pause(1000);
        await this.click(this.deleteAllNotificationsOption);
        await browser.pause(1000);
        await this.click(this.clearButton);
      }
    public async clearNotificationsFromViewAllPage(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.viewAllButton);
        await browser.pause(1000);
        await this.click(this.trashIcon);
        await this.click(this.deleteButton);
      }

    public getAllClearMessage(): WebdriverIO.Element {
        return this.allClearMessage;
    }  
    }


    