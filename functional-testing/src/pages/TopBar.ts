import {Action} from '../globalTasks/Action'

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
        await this.click(this.helpIcon);
      }

    public async onlineHelpTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await this.click(this.onlineHelpComponent);
        await this.switchToNewTab(currentTab);
      }

      public async gettingStartedTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await this.switchToNewTab(currentTab);
        await this.click(this.gettingStartedComponent);
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
      };

      public async provideFeedbackTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.click(this.provideFeedbackComponent)
        await this.click(this.feedbackType);
        await this.click(this.cancelButton);
      }

      public async releaseNotesTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await this.click(this.releaseNotesComponent);
        await this.switchToNewTab(currentTab);
      }

      public async signOutOption(): Promise<void> {
        await this.click(this.expandIcon)
        await this.click(this.signOut);
      }

      public async logOut(): Promise<void> {
        await this.click(this.expandIconVault)
        await this.click(this.LogOut);
      }

      public async aboutTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.click(this.aboutComponent);
      }

      public async legalTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.click(this.legalOption);
      }
      public async privacyPolicyTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.click(this.privacyPolicyOption);
        var currentTab = browser.getWindowHandle();
        await this.switchToNewTab(currentTab);
      }

      public async termsUseOptionTool(): Promise<void> {
        var currentTab = browser.getWindowHandle();
        await browser.closeWindow();
        await this.switchToNewTab(currentTab);
        await this.click(this.termsUseOption);
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

   