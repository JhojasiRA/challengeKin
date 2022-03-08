
export class Action {

    public async hoverAndClick(element:WebdriverIO.Element): Promise<void> {
        await element.moveTo()
        await element.click();
    }

    public async clearAndEnterText(textBox: WebdriverIO.Element, textToWrite: string): Promise<void> {
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

    public async xor(val1: boolean, val2: boolean): Promise<boolean>{
        return (val1 && !val2) || (!val1 && val2)
    }
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path?: string) {
        return browser.url(`${process.env.HOME_URL}/${path}`)
    }


}
