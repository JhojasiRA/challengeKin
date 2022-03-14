import { Action } from '../globalTasks/Action';

export class Eula extends Action {
    get acceptButton() { return $("//*[@class = 'primary-mat-button']") }
    get eulaContent() { return $("//*[@class='eula-content']") }
    get skipButton() { return $("#welcome-modal-skip-continue") }

    public async Eula(): Promise<void> {
        //await browser.sleep(4000); protractor
        //await browser.pause(3000) wdio
        await browser.executeScript("document.querySelector('button[class='primary-mat-button']').removeAttribute('disabled')", null)
        //global.lastError = 'accept button button was not located'
        this.click(this.acceptButton)
    }

    public async acceptEula(testingEula: string): Promise<void> {
        let eulaTest = testingEula.toLowerCase() == 'true'
        if (await this.acceptButton.isExisting()) {
            browser.pause(3000)
            // global.lastError = 'Stuck on redirecting'
            await this.eulaContent.waitForDisplayed({ timeout: global.intElementsTimeout })
            browser.pause(5000);
            // global.lastError = 'Click accept Eula Error'
            this.Eula();
        } else if (eulaTest) {
            global.lastError = 'Eula accept button is not present. Either the EULA has already been accepted or there is an error with the EULA feature'
            throw new Error(global.lastError)
        }
        if (await this.skipButton.isExisting()) await this.click(this.skipButton)
    }

}