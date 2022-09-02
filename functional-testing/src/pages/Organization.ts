import { Action } from '../globalTasks/Action';
import * as path from "path";

export class Organization extends Action {
    get nameOrganizationField() { return browser.$('//*[@formcontrolname="tenantName"]'); }
    get createButton() { return browser.$("//button//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'create')]"); }
    get cancelCreationButton() { return browser.$('//*[@class = "secondary-mat-button"]'); }
    get cancelEditInfo() { return browser.$('//button[ contains (text(), "cancel")] |//span[ contains (text(), "cancel")]'); }
    get saveButton() { return browser.$('//*[ contains (text(), "Save")]'); }
    get confirmationButton() { return browser.$('//*[ contains (text(), "Continue")]'); }
    get descriptionField() { return browser.$('//*[@formcontrolname="tenantDescription"]'); }
    get messageSuccessfully() { return browser.$('//*[ contains (text(), "Congratulations! You have created the organization test OrgRockwellAut successfully!")]'); }
    get successMessage() { return browser.$('//*[ contains (text(), "Organization updated successfully.")]'); }
    get discardChangesMessage() { return browser.$('//*[ contains (text(), "Changes will not be saved. Do you want to proceed?")]'); }
    get OK() { return browser.$('//button[contains(text(), "OK")]'); }
    get goToDashboard() { return browser.$("//button//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'go to dashboard')]")}
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
    get orgVisibilityOnCreate() {return browser.$('//mat-radio-button[@id="mat-radio-2"]');}
    get orgVisibilityOffEdit() {return browser.$('//*[ contains (text(), "Visibility OFF")]');}
    get organizationName() {return browser.$('//div[ contains (text(),"test OrgRockwellAut")]');}
    get orgVisibilityOnEdit() {return browser.$('//*[ contains (text(), "Visibility ON")]');}
    get nextButton(){return browser.$("//button//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'next')]")}
    get checkFTRA(){return browser.$('(//input[starts-with(@id,"mat-slide-toggle-")])[2]')}
    get checkFoo(){return browser.$('(//input[starts-with(@id,"mat-slide-toggle-")])[4]')}
    get checkDesignStudio(){return browser.$('(//input[starts-with(@id,"mat-slide-toggle-")])[3]')}
    get checkVault(){return browser.$('(//input[starts-with(@id,"mat-slide-toggle-")])[1]')}
    
    public async newOrganization(): Promise<void> {
        await this.enterText(this.nameOrganizationField,"test OrgRockwellAut");
        await this.enterText(this.descriptionField, "TEST"); 
        await this.click(this.nextButton);
        await this.click(this.createButton);
        
    }

    public async publicOrganizationCreation( ): Promise<void> { 
        await this.enterText(this.nameOrganizationField,"test OrgRockwellAut" );
        await this.enterText(this.descriptionField, "TEST");
        await this.click(this.orgVisibilityOnCreate);
        await this.click(this.nextButton);
        await this.click(this.createButton);      
    }

    public async newOrg(newOrgName:string): Promise<void> {
        await this.enterText(this.nameOrganizationField, newOrgName);
        await this.click(this.nextButton);
        await browser.pause(1000); 
        await this.click(this.createButton);
        await this.click(this.goToDashboard);
        await browser.pause(1000);
    }
    
    public async newOrganizationWithLogo(): Promise<void> {
        await this.enterText(this.nameOrganizationField, "Organization automation");
        await this.enterText(this.descriptionField, "TEST");
        const filePath = path.resolve(process.cwd() + '/functional-testing/support/testLogos/Rockwell_Automation_Logo.jpeg');
        await browser.execute('document.getElementById("' + this.addOrganizationLogo + '").removeAttribute("hidden")');
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.addLogo.setValue(remoteFilePath);
        await this.click(this.nextButton);
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
        await browser.pause(1000);
        await this.click(this.saveButton);
    }

    public async editPublicOrganization(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.orgVisibilityOffEdit);
        await this.click(this.saveButton);
    }
    public async editLogoOrganization(): Promise<void> {
        await browser.pause(1000);
        await  browser.execute("document.querySelector(\"img[id='edit-org-logo-img']\").setAttribute(\"hidden\",\"true\");"); 
        await browser.pause(1000);
        const filePath = path.resolve(process.cwd() + '/functional-testing/support/testLogos/RA.jpeg');
        await browser.execute('document.getElementById("' + this.editOrganizationLogo + '").removeAttribute("hidden")');
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.editLogo.setValue(remoteFilePath);
        await browser.pause(1000);
        await this.click(this.saveButton);
    }
    public async addNewLogoOrganization(): Promise<void> {
        await browser.pause(1000);
        const filePath = path.resolve(process.cwd() + '/functional-testing/support/testLogos/FTH.jpeg');
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
        await this.click(this.OK);
    }

    public async continue(): Promise<void> {
        await this.click(this.continueDiscardChanges);
    }

    public async inviteCode(): Promise<void> {
        await browser.pause(2000);
        await this.click(this.copyInviteCodeBtn);
        await this.click(this.closeMessageInviteCodeCopied);
    }

    public async newInviteCode(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.newCodeButton);
    }

    public async joinRequest(): Promise<void> {
        await this.joinUsingInviCode.click();
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

    public async selectPublicOrganizationEdit(): Promise<void> {
       await this.enterText(this.descriptionField, "Testing"); 
       await this.click(this.orgVisibilityOnEdit);  
       await this.click(this.saveButton);
       await this.click(this.confirmationButton);
    }

    public async selectPrivateOrganizationEdit(): Promise<void> {
        await this.enterText(this.descriptionField, "Testing");
        await this.click(this.orgVisibilityOffEdit);  
        await this.click(this.saveButton);
        await this.click(this.confirmationButton);
     }

    public async selectPublicOrganization(): Promise<void> {
        await this.click(this.orgVisibilityOnEdit);
     }

    public async searchOrganization(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.OK);
    }

    public async selectVaultService(): Promise<void> {
        await this.enterText(this.nameOrganizationField,"test OrgRockwell" );
        await this.enterText(this.descriptionField, "TEST");
        await this.click(this.nextButton);
        await this.click(this.checkFTRA);
        await this.click(this.checkDesignStudio);
        await this.click(this.checkFoo);
        await this.click(this.createButton); 
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

    public getMessageOrganizationName(): WebdriverIO.Element {
        return this.organizationName;
    }

   

}