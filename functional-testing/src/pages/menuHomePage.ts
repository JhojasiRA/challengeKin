import {Action} from '../globalTasks/Action';
import { HomePage } from './HomePage';

export class MenuHomePage extends Action {
    get menuIcon() { return browser.$('#rubick-menu-btn');}
    get approveUser() { return browser.$('//*[@role="navigation"]//*[ contains (text(), "Approve Users")]');}
    get approve() { return browser.$('//*[ contains (text(), "APPROVE")]');}
    get createOrganization() { return browser.$('//*[ contains (text(), "Create Organization")]');}
    get editOrganization() { return browser.$('//*[ contains (text(), "Edit Organization")]');}
    get joinOrganization() { return browser.$('//*[ contains (text(), "Join")]');}
    get inviteUsers() { return browser.$('//*[contains(text(), "Invite Users")]');}
    get invitationManagement() { return browser.$('//*[contains(text(), "Invitation Management")]');}
    get accessManagement() { return browser.$('//*[contains(text(),"Access Management")]');}
    get entitlements() { return browser.$('//*[@role="navigation"]//*[contains(text(), "Entitlements")]')}
    get HomeIcon() { return browser.$('(//*[ contains (text(), "Home")])[1]');}

    public async approveUserOption():Promise<void>{
        //global.lastError = 'menu icon was not located'
        await this.click(this.menuIcon);
        await this.click(this.approveUser);
      }

    public async createOrganizationOption():Promise<void>{
        //global.lastError = 'menu icon was not located'
        await browser.pause(1000);
        await this.click(this.menuIcon);
        await browser.pause(1000);
        await this.click(this.createOrganization);
      }

    public async editOrganizationOption():Promise<void>{
        //global.lastError = 'menu icon was not located'
        await browser.pause(1000);
        await this.click(this.menuIcon);
        await browser.pause(3000);
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

      public async entitlementsOption():Promise<void>{
        await this.click(this.menuIcon);
        await this.click(this.entitlements)
      }

      public async indexOption():Promise<void>{
        await this.click(this.menuIcon);
        await this.click(this.HomeIcon);
      }

}