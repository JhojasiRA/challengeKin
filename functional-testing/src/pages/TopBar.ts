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
    get expandIconVaultdd() { return browser.$('//*[@id="navbar"]/button[4]');}
    get LogOut() { return browser.$('//*[ contains (text(), "Logout")]');}

    public async helpIconTool(): Promise<void> {
       // global.lastError = 'help Icon was not located'
        await this.click(this.helpIcon);
      }

    public async onlineHelpTool(): Promise<void> {
        await this.switchToNewTab(this.onlineHelpComponent);
        // global.lastError = 'online help element was not located'
        /*await this.click(this.onlineHelpComponent);
        let newtab = await browser.getWindowHandle();
        await browser.switchWindow(newtab);*/
      }

}

   