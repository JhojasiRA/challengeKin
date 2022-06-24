import { Action } from "../globalTasks/Action";
const ALLOCATE_BTN = (catalogNumber: string) => `//*[@class='ag-center-cols-container']//*[@role="row"]//*[contains(text(), '${catalogNumber}')]//following::*[contains(text(),'Active')]//following::*[@text="Allocate"]`

export class Entitlements extends Action {
    get allocateBtn() { return browser.$("//*[@id='mat-dialog-0']//button[contains(text(),'Allocate')]")}
    
    public async allocateEntitlement(catalogNumber:string): Promise<void> {
        const allocateButton = await $(ALLOCATE_BTN(catalogNumber))
        await this.click(allocateButton)
        await this.click(this.allocateBtn)
    }
}