import { Action } from '../globalTasks/Action'

export class HomePage extends Action {
    get vaultCard() { return $(`#card-Vault`) }
    get vaultView() { return $(`(//*[ contains (text(), "Vault")])[2]`) }
    get FTRACard() { return $(`#card-SecureRemoteAccess`) }
    get homePage() { return $(`//*[@class="xng-breadcrumb-root"]//*[ contains (text(), "Home")]`) }
    get rubikIcon() { return $('#rubick-menu-btn') }
    get lockFTRAIcon() { return $(`//*[@id="card-SecureRemoteAccess"]//*[@class= "fav-lock-icon lock-icon"]`) }
    get lockFooIcon() { return $(`//*[@id="card-FooService"]//*[@class= "fav-lock-icon lock-icon"]`) }
    get lockUniqoIcon() { return $(`//*[@id="card-Vista"]//*[@class= "fav-lock-icon lock-icon"]`) }
    get lockEaasIcon() { return $(`//*[@id="card-EaaS"]//*[@class= "fav-lock-icon lock-icon"]`) }
    get fiixCard() { return $(`#card-Fiix`) }
    get fooCard() { return $(`#card-FooService`) }
    get uniqoCard() { return $(`#card-Vista`) }
    get eaasCard() { return $(`#card-EaaS`) }
    get allAppsTab() { return $('#mat-tab-label-0-0') }
    get designHubTab() { return $('#mat-tab-label-0-1') }
    get operationsHubTab() { return $('#mat-tab-label-0-2') }
    get maintenanceHubTab() { return $('#mat-tab-label-0-3') }

    async dashboard(): Promise<void> {
        await browser.pause(3000);
        await browser.navigateTo(process.env.PORTAL_URL)
    }

    async launchVault(): Promise<void> {
        await this.click(this.vaultCard);
        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
    }

    async launchFiix(): Promise<void> {
        await this.click(this.fiixCard);
        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
    }

    async launchFTRA(): Promise<void> {
        await this.click(this.FTRACard);
    }

    async launchFoo(): Promise<void> {
        await this.click(this.fooCard);
    }

    async launchUniqo(): Promise<void> {
        await this.click(this.uniqoCard)
        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
    }

    async launchEaas(): Promise<void> {
        await this.click(this.eaasCard)
    }

    public async newBrowser(): Promise<void> {
        await browser.pause(3000);
        await browser.closeWindow()
        let handles = await browser.getWindowHandles()
        browser.switchToWindow(handles[0]);
    }


    public getVaultView(): WebdriverIO.Element {
        return this.vaultView;
    }

    public getFtraCard(): WebdriverIO.Element {
        return this.FTRACard;
    }

    public getFTRACard(): WebdriverIO.Element {
        return this.lockFTRAIcon;
    }

    public getMessageHome(): WebdriverIO.Element {
        return this.homePage;
    }

    async clickAllAppsTab(): Promise<void> {
        await this.click(this.allAppsTab)
    }

    async clickDesignHubTab(): Promise<void> {
        await this.click(this.designHubTab)
    }
    async clickOperationsHubTab(): Promise<void> {
        await this.click(this.operationsHubTab)
    }
    async clickMaintenanceHubTab(): Promise<void> {
        await this.click(this.maintenanceHubTab)
    }
}


