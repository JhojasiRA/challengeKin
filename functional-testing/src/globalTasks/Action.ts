export class Action {

    public async click(element:WebdriverIO.Element): Promise<void> {
        await element.waitForClickable({ timeout: global.intElementsTimeout })
        await element.scrollIntoView();
        await element.click();
    }

    public async enterText(textBox: WebdriverIO.Element, textToWrite: string): Promise<void> {
        let tbValue = await textBox.getValue()
        await textBox.waitForDisplayed({ timeout: global.intElementsTimeout })
        tbValue = (tbValue == null) ? '' : tbValue
        for(let i = 0; i<tbValue.length;i++){
            await textBox.keys("\uE003");
        }
        tbValue = await textBox.getValue()
        tbValue = (tbValue == null) ? '' : tbValue
        for(let i = 0; i<tbValue.length;i++){
            await textBox.keys("\uE017");
        }
        await textBox.setValue(textToWrite)
    }
 
    public async refreshPage(): Promise<void> {
        await browser.refresh();
    }

    public async closeWindow(): Promise<void> {
        await browser.refresh();
    }

    public async waitForElementPresent(element: WebdriverIO.Element): Promise<void> {
        await element.waitForExist({ reverse: true });
    }

    public async selectFromDropdown(dropdown: WebdriverIO.Element, option: string): Promise<void> {
        const WEB_ELEMENT = (option: string) => `//*[contains(text(), '${option}') and @class='mat-option-text']/ancestor::mat-option`
        await this.click(dropdown)
        var webElement: WebdriverIO.Element;

        try {
            if (browser.$(WEB_ELEMENT(option)).isDisplayed) {
                webElement = await browser.$(WEB_ELEMENT(option));
                await webElement.waitForClickable({ timeout: 10000 });
                await webElement.click();
                if (await webElement.isExisting()) { await webElement.keys("\uE00C") };
            }
        } catch (error) {
            global.lastError = 'Option: ' + option + ' is not displayed'
            throw new Error('Option: ' + option + ' is not displayed')

        }
    }

    public async switchToNewTab(currentTab: string): Promise<void> {
      //  var currentTab = browser.getWindowHandle();
      //  await this.click(element);
        var allTabs = await browser.getWindowHandles();
        for (var i = 0; i < allTabs.length; i++) {
            if (allTabs[i] != currentTab) {
                await browser.switchToWindow(allTabs[i]);
            break;
            }
        }
    }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
     open (path?: string) {
        return browser.url(`${process.env.PORTAL_URL}/${path}`)
    }

    openInvitUrl (path?: string) {
        return browser.url(`${path}`)
    }


}