import {Action} from '../globalTasks/Action';

export class MenuHomePage extends Action {
    get menuIcon() { return browser.$('//*[@class="ra-icon-ide-sm-bars ra-common-icon"]');}
    get approveUser() { return browser.$('//*[@class="mat-list-item-content"]//*[ contains (text(), "Approve Users")]');}
    get createOrganization() { return browser.$('//*[ contains (text(), "Create Organization")]');}
    get editOrganization() { return browser.$('//*[ contains (text(), "Edit Organization")]');}
    get joinOrganization() { return browser.$('//*[ contains (text(), "Join")]');}
    get inviteUsers() { return browser.$('//*[contains(text(), "Invite Users")]');}
    get invitationManagement() { return browser.$('//*[@class="mat-list-item-content"]/child::span[contains(text(), "Invitation Management")]');}
    get accessManagement() { return browser.$('//span[contains(text(),"Access Management")]');}

    public async approveUserOption():Promise<void>{
        //global.lastError = 'menu icon was not located'
        await this.click(this.menuIcon);
        await this.click(this.approveUser);
      }

    public async createOrganizationOption():Promise<void>{
        //global.lastError = 'menu icon was not located'
        await this.click(this.menuIcon);
        await this.click(this.createOrganization);
      }

    public async editOrganizationOption():Promise<void>{
        //global.lastError = 'menu icon was not located'
        await this.click(this.menuIcon);
        await browser.pause(1000);
        await this.click(this.editOrganization);
      }

      public async joinOrganizationOption():Promise<void>{
        //global.lastError = 'join organization option was not located'
        await this.click(this.menuIcon);
        await this.click(this.joinOrganization);
      }

      public async inviteUsersOption():Promise<void>{
        await this.click(this.menuIcon);
        await this.click(this.inviteUsers)
      }
      
      public async invitationManagementOption():Promise<void>{
        await this.click(this.menuIcon);
        await this.click(this.invitationManagement)
      }

      public async accessManagementOption():Promise<void>{
        await this.click(this.menuIcon);
        await this.click(this.accessManagement)
      }

}