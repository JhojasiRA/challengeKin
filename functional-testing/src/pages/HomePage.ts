import { Action } from '../globalTasks/Action'

export class HomePage extends Action {
    get vaultCard() { return $(`#card-Vault`) }
    get vaultView() { return $(`(//*[ contains (text(), "Vault")])[2]`) }
    get FTRACard() { return $(`#card-SecureRemoteAccess`) }
    get homePage() { return $(`//*[@class="xng-breadcrumb-root"]//*[ contains (text(), "Home")]`) }
    get rubikIcon() { return $('#rubick-menu-btn') }
    get lockFTRAIcon() {return $(`//*[@id="card-SecureRemoteAccess"]//*[@class= "fav-lock-icon lock-icon"]`)}


    async dashboard(): Promise<void> {
        await browser.pause(3000);
        await browser.navigateTo(process.env.PORTAL_URL)
    }

    async launchVault(): Promise<void> {
        // global.lastError = 'vault card was not located'
        await this.click(this.vaultCard);
        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
    }

    async launchFTRA(): Promise<void> {
        //global.lastError = 'FTRA card was not located'
        await this.click(this.FTRACard);
    }

    public async newBrowser(): Promise<void> {
        await browser.pause(3000);
        await browser.closeWindow()
        let handles = await browser.getWindowHandles()
        browser.switchToWindow(handles[0]);
    }


    public getVaultView(): WebdriverIO.Element {
        //global.lastError = 'vault page is not visible'
        return this.vaultView;
    }

    public getFtraCard(): WebdriverIO.Element {
        //global.lastError = 'FTRA card is clickable'
        return this.FTRACard;
    }

    public getFTRACard(): WebdriverIO.Element {
        //global.lastError = 'FTRA card is clickable'
        return this.lockFTRAIcon;
    }

    public getMessageHome(): WebdriverIO.Element {
        return this.homePage;
    }
}


