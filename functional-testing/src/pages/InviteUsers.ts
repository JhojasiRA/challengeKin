import {Action} from '../globalTasks/Action';
import {Invitation} from '../model/invitation';

export class InviteUsers extends Action {
    get resourceField() { return browser.$('//*[@id="mat-select-0"]');}
    get roleField() { return browser.$('//*[@id="mat-select-2"]');}
    get emailsTextArea() { return browser.$('//*[@id="mat-input-0"]');}
    get sendInviteButton() { return browser.$('//*[contains(text(), "send invite")]');}
    get okButton() { return browser.$('//button[contains(text(), "OK")]');}
    get closeButton() { return browser.$('//button[contains(text(), "close")]')}
    public invitation: Invitation

    public async inviteUser(resource, role, email):Promise<void> {
        await this.selectFromDropdown(this.resourceField, resource);
        await this.selectFromDropdown(this.roleField, role);
        await this.enterText(this.emailsTextArea, email);
        await this.click(this.sendInviteButton);
        await this.click(this.okButton);
        this.invitation = new Invitation(email, resource, role);
    }

    public async closeInvitation(): Promise<void> {
        await this.click(this.closeButton)
    }


}