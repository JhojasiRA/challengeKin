import { Action } from '../globalTasks/Action'

export class HomePage extends Action {
    get vaultCard() { return $(`#card-Vault`) }
    get vaultView() { return $(`//*[ contains (text(), "Vault")]`) }
    get FTRACard() { return $(`#card-SecureRemoteAccess`) }
    get homePage() { return $(`//*[ contains (text(), "All Apps")]`) }
    get rubikIcon() { return $('#rubick-menu-btn') }
    get lockFTRAIcon() { return $(`//*[@id="card-SecureRemoteAccess"]//*[contains (@class, "fav-lock-icon")]`) }
    get lockFooIcon() { return $(`//*[@id="card-FooService"]//*[contains (@class, "fav-lock-icon")]`) }
    get lockUniqoIcon() { return $(`//*[@id="card-Vista"]//*[contains (@class, "fav-lock-icon")]`) }
    get lockEaasIcon() { return $(`//*[@id="card-EaaS"]//*[contains (@class, "fav-lock-icon")]`) }
    get fiixCard() { return $(`#card-Fiix`) }
    get fooCard() { return $(`#card-FooService`) }
    get optixCard() { return $(`#card-FTOptix`) }
    get EaasCard() { return $(`#card-EaaS`) }
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
        let handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
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

    async launchOptix(): Promise<void> {
        await this.click(this.optixCard)
        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
    }

    async launchEaaS(): Promise<void> {
        await this.click(this.EaasCard)
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


