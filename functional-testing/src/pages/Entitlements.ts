import { Action } from "../globalTasks/Action";
const ALLOCATE_BTN = (catalogNumber: string) => `(//*[@class='ag-center-cols-container']//*[@role="row"]//*[contains(text(), '${catalogNumber}')]//following::*[contains(text(),'Active')])[1]//following-sibling::*//button`

export class Entitlements extends Action {
    get allocateBtn() { return browser.$("//*[contains(@id, 'mat-dialog')]//following::*[contains(text(),'Allocate')]")}
    
    public async allocateEntitlement(catalogNumber:string): Promise<void> {
        const allocateButton = await $(ALLOCATE_BTN(catalogNumber))
        await this.click(allocateButton)
        await this.click(this.allocateBtn)
    }
}