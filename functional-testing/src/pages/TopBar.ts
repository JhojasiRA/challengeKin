import {Action} from '../globalTasks/Action';

export class TopBar extends Action {
    get helpIcon() { return browser.$("//*[contains(text(), 'help')]");}
    get onlineHelpComponent() { return browser.$("//*[contains(text(), 'Online Help')]");}
    get gettingStartedComponent() { return browser.$('//*[ contains (text(), "Getting Started")]');}
    get provideFeedbackComponent() { return browser.$('//*[ contains (text(), "Provide Feedback")]');}
    get feedbackType() { return browser.$('//*[ contains (text(), " Report an Issue ")]');}
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

    public async helpIconTool(): Promise<void> {
        await this.click(this.helpIcon);
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
        await this.click(this.feedbackType);
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
}

   