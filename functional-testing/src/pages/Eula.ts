import { Action } from '../globalTasks/Action';

export class Eula extends Action {
    get acceptButton() { return $("//app-ra-button[@text='Accept']") }
    get eulaContent() { return $("//*[@class='eula-content']") }
    get skipButton() { return $("#welcome-modal-skip-continue") }
    get closeMessage(){ return $("//*[@id='cdk-overlay-0']//mat-icon[contains(text(), 'close')]")}
    get lastPart() { return $("//p[3]")}
    get lastPartOfEula() { return $("//*[@class='eula-content']" )}

    public async acceptEula(testingEula: string): Promise<void> {
        let eulaTest = testingEula.toLowerCase() == 'true'
        if (await this.acceptButton.isExisting()) {
            await this.eulaContent.waitForDisplayed({ timeout: global.intElementsTimeout })
           // browser.pause(2000)
            await this.click(this.closeMessage)
            await this.lastPartOfEula.scrollIntoView({ behavior: 'smooth', block:'end'})
            await browser.pause(2000)
            await this.acceptButton.waitForEnabled({ timeout: 5000, timeoutMsg: "Eula button is not enabled after scroll" })
            await this.click(this.acceptButton);
        } else if (eulaTest) {
            global.lastError = 'Eula accept button is not present. Either the EULA has already been accepted or there is an error with the EULA feature'
            throw new Error(global.lastError)
        }
        await browser.pause(1000)
        if (await this.skipButton.isExisting()) await this.click(this.skipButton)
    }

}