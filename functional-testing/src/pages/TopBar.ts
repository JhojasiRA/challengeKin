import {Action} from '../globalTasks/Action';
import { topBar,organization,menuhomepage } from '../../support/Hooks';

const chooseOrganization = (orgName:string)=>`(//span[@class='mat-option-text' and text()=' ${orgName} '])[1]`

export class TopBar extends Action {
    get helpIcon() { return browser.$('//i[@class="ra-icon-ide-sm-help ra-common-icon"]');}
    get onlineHelpComponent() { return browser.$("//*[contains(text(), 'Online Help')]");}
    get gettingStartedComponent() { return browser.$('//*[ contains (text(), "Getting Started")]');}
    get provideFeedbackComponent() { return browser.$('//*[ contains (text(), "Provide Feedback")]');}
    get feedbackText() {return browser.$('//textarea[@name="feedbackText"]');}
    get feedbackType() {return browser.$('//span[ contains (text(),"Provide Feedback")]');}
    get enhancementType() {return browser.$('//*[ contains (text(),"Enhancement Request")]');}
    get issueType() {return browser.$('//*[ contains (text(), " Report an Issue ")]');}
    get provideFeedbackText() {return browser.$('//div[@class="headline-6"]');}
    get feedbackRequiredMessage() {return browser.$('//*[ contains (text(), "Feedback is required")]');}
    get sendButton() { return browser.$('//*[ contains (text(), "Send")]');}
    get cancelButton() { return browser.$('//*[ contains (text(), "CANCEL")]');}
    get releaseNotesComponent() { return browser.$('//*[ contains (text(), "Release Notes")]');}
    get messageReleaseNotes() { return browser.$('(//*[ contains (text(), "Release Notes")])[3]');}
    get aboutComponent() { return browser.$('//*[ contains (text(), "About")]');}
    get title() { return browser.$('//title');}
    get messageGettingStarted() { return browser.$('//*[@id="factorytalk-hub-getting-started-collection"]/h1');}
    get legalOption() { return browser.$('(//*[ contains (text(), "Legal")])[2]');}
    get licenseAgreementOption() { return browser.$('(//*[ contains (text(), "License Agreement")])[2]');}
    get privacyPolicyOption() { return browser.$('(//*[ contains (text(), "Privacy Policy")])[2]');}
    get termsUseOption() { return browser.$('(//*[ contains (text(), "Terms of Use")])[2]');}
    get expandIcon() { return browser.$('//*[@id="account-circle-btn"]');}
    get signOut() { return browser.$('//*[ contains (text(), "Sign Out")]');}
    get expandIconVault() { return browser.$('//*[@id="navbar"]/button[4]');}
    get LogOut() { return browser.$('//*[ contains (text(), "Logout")]');}
    get pageTitle() { return $("//h1")}
    get feedbackElement() {return browser.$('//mat-dialog-container[@id="mat-dialog-0"]'); }
    get modal() {return browser.$('//mat-dialog-actions[@class="mat-dialog-actions feedback-modal-action-container"]'); }
    get orgNameOption() {return browser.$('//*[@id= "ft-hub-org-name"]'); }
    get changeOrgModal() {return browser.$('//*[@role= "dialog"]'); }
    get selectOrg() {return browser.$('//*[@role= "combobox"]'); }
    get org1() {return browser.$('//*[contains(text(),"Organization automation")]'); }
    get changeOrgButton() {return browser.$('//*[@label= "Change"]'); }
    get cancelChangeOrgButton() {return browser.$('//*[contains(text()," Cancel")]'); }


    public async switchOrganization(newOrgName,orgName): Promise<void> {
      await menuhomepage.createOrganizationOption();
      await organization.newOrg(newOrgName);
      await this.click(this.orgNameOption);
      await this.click(this.selectOrg);
      await browser.$(chooseOrganization(orgName)).click();
      await browser.pause(1000);
      await this.click(this.changeOrgButton);
    }

    public async setAnOrganization(orgName): Promise<void> {
      await this.click(this.selectOrg);
      await browser.$(chooseOrganization(orgName)).click();
      await browser.pause(1000);
      await this.click(this.changeOrgButton);
    }
    public getOrganizationName(): WebdriverIO.Element {
      return this.org1;
  }

      public async helpIconTool(): Promise<void> {
        await this.click(this.helpIcon);
        await browser.pause(1000);
      }

      public async onlineHelpTool(): Promise<void> {
        var currentTab = await browser.getWindowHandle();
        await this.click(this.onlineHelpComponent);
        await this.switchToNewTab(currentTab);
      }

      public async gettingStartedTool(): Promise<void> {
        await browser.pause(1000);
        var currentTab = browser.getWindowHandle();
        await this.switchToNewTab(currentTab);
        await this.helpIconTool();
        await this.click(this.gettingStartedComponent);
        var currentTab = browser.getWindowHandle();
        await browser.pause(1000);
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
      };

      public async provideFeedbackTool(): Promise<void> {
        await browser.pause(1000);
        await this.click(this.provideFeedbackComponent)
        await this.click(this.feedbackText);
        await browser.pause(1000);
        await this.click(this.cancelButton);
      }

      public async releaseNotesTool(): Promise<void> {
        await browser.pause(1000);
        var currentTab = await browser.getWindowHandle();
        await this.releaseNotesComponent.click();
        await this.switchToNewTab(currentTab);
      }

      public async signOutOption(): Promise<void> {
        await this.click(this.expandIcon)
        await this.click(this.signOut);
      }

      public async logOut(): Promise<void> {
        await browser.pause(1000);
        await this.expandIconVault.click()
        await this.LogOut.click();
      }

      public async aboutTool(): Promise<void> {
        await browser.pause(1000);
        await this.aboutComponent.click();
      }

      public async legalTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.legalOption.click();
      }

      public async privacyPolicyTool(): Promise<void> {
        await browser.pause(1000);
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.privacyPolicyOption.click();
        var currentTab = browser.getWindowHandle();
        await this.switchToNewTab(currentTab);
      }

      public async termsUseOptionTool(): Promise<void> {
        await browser.pause(1000);
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.termsUseOption.click();
        var currentTab = browser.getWindowHandle();
        await this.switchToNewTab(currentTab);
      }

      public getMessageGettingStarted(): WebdriverIO.Element{
        return this.messageGettingStarted;
      }
      
      public getMessageReleaseNote(): WebdriverIO.Element{
        return this.messageReleaseNotes;
      }

      public getMessage(): WebdriverIO.Element {
        return this.feedbackRequiredMessage;
      }

      public async provideFeedback(): Promise<void> {
          await this.click(this.provideFeedbackComponent);
      }

      public async provideFeedbackInfo(): Promise<void> {
          await topBar.click(this.feedbackType);
          await this.enterText(this.feedbackText, "Provide feedback testing automation");   
          await this.click(this.sendButton);         
      }
      
      public async EnhancementInfo(): Promise<void> {
        await this.click(this.enhancementType);
        await this.enterText(this.feedbackText, "Enhancement info testing automation");   
        await this.click(this.sendButton);     
      }

      public async issueInfo(): Promise<void> {
        await this.click(this.issueType);
        await this.enterText(this.feedbackText, "Issue info testing automation");   
        await this.click(this.sendButton);      
      }

      public async NotFeedbackInfo(): Promise<void> {
        await topBar.click(this.feedbackType);
        await topBar.click(this.feedbackText);
        await topBar.click(this.provideFeedbackText);
      }
    }
      
     
    

   