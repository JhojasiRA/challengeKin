import {Action} from '../globalTasks/Action';

export class TopBar extends Action {
    get helpIcon() { return browser.$('//*[@id="navbar"]/button[4]');}
    get onlineHelpComponent() { return browser.$('(//*[ contains (text(), "Online Help")])[2]');}
    get gettingStartedComponent() { return browser.$('(//*[ contains (text(), "Getting Started")])[2]');}
    get provideFeedbackComponent() { return browser.$('(//*[ contains (text(), "Provide Feedback")])[2]');}
    get feedbackType() { return browser.$('//*[ contains (text(), " Report an Issue ")]');}
    get cancelButton() { return browser.$('//*[ contains (text(), "CANCEL")]');}
    get releaseNotesComponent() { return browser.$('(//*[ contains (text(), "Release Notes")])[2]');}
    get messageReleaseNotes() { return browser.$('(//*[ contains (text(), "Release Notes")])[3]');}
    get aboutComponent() { return browser.$('(//*[ contains (text(), "About")])[2]');}
    get messageOnlineHelp() { return browser.$('(//*[ contains (text(), "FactoryTalk Design Hub Help")])[4]');}
    get messageGettingStarted() { return browser.$('(//*[ contains (text(), "Getting Started")])[3]');}
    get legalOption() { return browser.$('(//*[ contains (text(), "Legal")])[2]');}
    get licenseAgreementOption() { return browser.$('(//*[ contains (text(), "License Agreement")])[2]');}
    get privacyPolicyOption() { return browser.$('(//*[ contains (text(), "Privacy Policy")])[2]');}
    get termsUseOption() { return browser.$('(//*[ contains (text(), "Terms of Use")])[2]');}
    get expandIcon() { return browser.$('//*[@id="account-circle-btn"]');}
    get signOut() { return browser.$('//*[ contains (text(), "Sign Out")]');}
    get expandIconVault() { return browser.$('//*[@id="navbar"]/button[4]');}
    get LogOut() { return browser.$('//*[ contains (text(), "Logout")]');}

    public async helpIconTool(): Promise<void> {
        await this.helpIcon.click();
      }

    public async onlineHelpTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await this.onlineHelpComponent.click();
        await this.switchToNewTab(currentTab);
      }

      public async gettingStartedTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await this.switchToNewTab(currentTab);
        await this.gettingStartedComponent.click();
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
      };

      public async provideFeedbackTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.provideFeedbackComponent.click()
        await this.feedbackType.click();
        await this.cancelButton.click();
      }

      public async releaseNotesTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await this.releaseNotesComponent.click();
        await this.switchToNewTab(currentTab);
      }

      public async signOutOption(): Promise<void> {
        await this.expandIcon.click()
        await this.signOut.click();
      }

      public async logOut(): Promise<void> {
        await this.expandIconVault.click()
        await this.LogOut.click();
      }

      public async aboutTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.aboutComponent.click();
      }

      public async legalTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.legalOption.click();
      }
      public async privacyPolicyTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.privacyPolicyOption.click();
        var currentTab = browser.getWindowHandle();
        await this.switchToNewTab(currentTab);
      }

      public async termsUseOptionTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.termsUseOption.click();
        var currentTab = browser.getWindowHandle();
        await this.switchToNewTab(currentTab);
      }

      public getMessageOnlineHelp(): WebdriverIO.Element{
        return this.messageOnlineHelp;
      }
      public getMessageGettingStarted(): WebdriverIO.Element{
        return this.messageGettingStarted;
      }
      public getMessageReleaseNote(): WebdriverIO.Element{
        return this.messageReleaseNotes;
      }
}

   