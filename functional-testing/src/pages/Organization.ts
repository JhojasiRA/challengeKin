import { Action } from '../globalTasks/Action';
import * as path from "path";

export class Organization extends Action {
    get nameOrganizationField() { return browser.$('//*[@formcontrolname="tenantName"]'); }
    get createButton() { return browser.$('//button[contains(text(), "create")]'); }
    get cancelCreationButton() { return browser.$('//*[@class = "secondary-mat-button"]'); }
    get cancelEditInfo() { return browser.$('//button[ contains (text(), "cancel")] |//span[ contains (text(), "cancel")]'); }
    get saveButton() { return browser.$('//*[ contains (text(), "save")]'); }
    get descriptionField() { return browser.$('//*[@formcontrolname="tenantDescription"]'); }
    get messageSuccessfully() { return browser.$('//*[ contains (text(), "You have created the organization successfully!")]'); }
    get successMessage() { return browser.$('//*[ contains (text(), "You have edited the organization successfully!")]'); }
    get discardChangesMessage() { return browser.$('//*[ contains (text(), "Changes will not be saved. Do you want to proceed?")]'); }
    get OK() { return browser.$('(//*[ contains (text(), "OK")])[1]'); }
    get continueDiscardChanges() { return browser.$('(//*[@class = "primary-mat-button"])[2]'); }
    get joinUsingInviCode() { return browser.$('//*[contains(text(),"here")]'); }
    get searchInput() { return browser.$('//*[@name = "searchInput"]'); }
    get continueButtonRequest() { return browser.$('//*[contains(@class, "primary-mat-button") and contains(text(), continue)]'); }
    get requestSentMessage() { return browser.$('//*[ contains (text(), "You will be notified once the owner of the organization approves your request")]'); }
    get newCodeButton() { return browser.$('//*[ contains (text(), "New Code") ]'); }
    get copyInviteCodeBtn() { return browser.$('//button[contains(text(), "Copy Invite Code")]'); }
    get closeMessageInviteCodeCopied() { return browser.$('//mat-icon[text()=" close "]'); }
    get addOrganizationLogo(){ return 'create-org-logo'}
    get addLogo(){ return browser.$(`#${this.addOrganizationLogo}`)}
    get editOrganizationLogo(){ return 'edit-org-logo'}
    get editLogo(){ return browser.$(`#${this.editOrganizationLogo}`)}


    get imageLogo() { return browser.$('//*[@alt="Image"]'); }


    public async newOrganization(): Promise<void> {
        await this.enterText(this.nameOrganizationField, "Organization automation");
        await this.enterText(this.descriptionField, "TEST");
        const filePath = path.resolve(process.cwd() + '/functional-testing/support/testLogos/Rockwell_Automation_Logo.jpeg');
        await browser.execute('document.getElementById("' + this.addOrganizationLogo + '").removeAttribute("hidden")');
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.addLogo.setValue(remoteFilePath);
        await this.click(this.createButton);
    }

    public async cancelCreation(): Promise<void> {
        await browser.pause(1000);
        await this.enterText(this.nameOrganizationField, "E2E automation tenant");
        await this.click(this.cancelCreationButton);
    }

    public async editOrganization(): Promise<void> {
        await browser.pause(1000);
        let newTextName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(4, 8);
        await this.enterText(this.nameOrganizationField, newTextName);
        await browser.execute('document.getElementById("' + this.imageLogo + '").setAttribute("style", "display: none")');
        console.log("funciono el set attribute")
        await browser.pause(10000);
        const filePath = path.resolve(process.cwd() + '/functional-testing/support/testLogos/RA.jpeg');
        await browser.execute('document.getElementById("' + this.editOrganizationLogo + '").removeAttribute("hidden")');
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.editLogo.setValue(remoteFilePath);
        await browser.pause(1000);
        await this.click(this.saveButton);
    }

    public async canceleditOrganization(): Promise<void> {
        await browser.pause(1000);
        await this.enterText(this.descriptionField, "TEST");
        await browser.pause(1000);
        await this.click(this.cancelEditInfo);
    }

    public async ok(): Promise<void> {
        await browser.pause(1000);
        // await browser.waitForAngularEnabled(false);
        await this.click(this.OK);
    }

    public async continue(): Promise<void> {
        await this.click(this.continueDiscardChanges);
    }

    public async inviteCode(): Promise<void> {
        await browser.pause(2000);
        // await browser.waitForAngularEnabled(false);
        await this.click(this.copyInviteCodeBtn);
        await this.click(this.closeMessageInviteCodeCopied);
    }

    public async newInviteCode(): Promise<void> {
        await browser.pause(1000);
        //await browser.waitForAngularEnabled(false);
        await this.click(this.newCodeButton);
        //await browser.waitForAngularEnabled(true)
    }

    public async joinRequest(): Promise<void> {
        await this.joinUsingInviCode.click();
        //await this.searchInput.keys(['CTRL', 'V']);
        await this.click(this.searchInput)
        await this.searchInput.keys(["\uE009", "V"]);
        await browser.pause(1000);
        await this.click(this.continueButtonRequest);
    }

    public async joinRequestWithOutDateCode(): Promise<void> {
        await this.click(this.joinUsingInviCode);
        await this.click(this.searchInput);
        await this.searchInput.keys(["\uE009", "V"]);
        await this.searchInput.keys("\uE003");
        await browser.pause(1000);
    }

    public getMessageCreateOrganization(): WebdriverIO.Element {
        return this.messageSuccessfully;
    }

    public getDiscardChangesMessage(): WebdriverIO.Element {
        return this.discardChangesMessage;
    }

    public getMessageEditOrganization(): WebdriverIO.Element {
        return this.successMessage;
    }

    public getMessageJoinRequest(): WebdriverIO.Element {
        return this.requestSentMessage;
    }

    public ContinueButton(): WebdriverIO.Element {
        return this.continueButtonRequest;
    }
}