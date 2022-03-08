
export class Action {

    public async click(element:WebdriverIO.Element): Promise<void> {
        await element.moveTo();
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

    public async waitForElementPresent(element: WebdriverIO.Element): Promise<void> {
        await element.waitForExist({ reverse: true });
    }

    public async selectFromDropdown(dropdown: WebdriverIO.Element, option: string): Promise<void> {
        const WEB_ELEMENT = (option: string) => `//*[contains(text(), '${option}') and @class='mat-option-text']/ancestor::mat-option`
        await this.click(dropdown)
        var webElement: WebdriverIO.Element;

        try {
            if (browser.$(WEB_ELEMENT(option)).isDisplayed) {
                webElement = browser.$(WEB_ELEMENT(option));
                await webElement.waitForClickable({ reverse: true, timeout: 10000 });
                await webElement.click();
                if (await webElement.waitForExist({ reverse: true, timeout:5000 })) { await webElement.keys("\uE00C") };
            }
        } catch (error) {
            global.lastError = 'Option: ' + option + ' is not displayed'
            throw new Error('Option: ' + option + ' is not displayed')

        }
    }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
     open (path?: string) {
        return browser.url(`${process.env.HOME_URL}/${path}`)
    }


}