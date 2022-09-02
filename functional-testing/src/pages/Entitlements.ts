import { Action } from "../globalTasks/Action";
const ALLOCATE_BTN = (catalogNumber: string) => `(//*[@class='ag-center-cols-container']//*[@role="row"]//*[contains(text(), '${catalogNumber}')]//following::*[contains(text(),'Active')])[1]//following-sibling::*//button`
const ALLOCATED_CREDITS = (quantity: number) => `//*[@class='ag-center-cols-viewport']//following::*[contains(text(),'9523-UtilityToken')]//following::*[@col-id='allocated' and text()='${quantity}']` 

export class Entitlements extends Action {
    get allocateBtn() { return browser.$("//*[contains(@id, 'mat-dialog')]//following::*[contains(text(),'Allocate')]")}
    
    public async allocateEntitlement(catalogNumber:string): Promise<void> {
        const allocateButton = await $(ALLOCATE_BTN(catalogNumber))
        await this.click(allocateButton)
        await this.click(this.allocateBtn)
    }

    public async allocatedCredits(quantity:number): Promise<string> {
        let allocatedCredits;
        try {
          allocatedCredits = await $(ALLOCATED_CREDITS(quantity)).getText();
          console.log(allocatedCredits);
        } catch (err) {
          allocatedCredits = 0;
        }
        return allocatedCredits;

    }
}