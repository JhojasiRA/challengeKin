import { Action } from "../globalTasks/Action";
const ALLOCATE_BTN = (catalogNumber: string) => `//*[contains(text(), '${catalogNumber}')]//ancestor::*[@role="row"]//descendant::button`
const ALLOCATED_CREDITS = (quantity: number) => `//*[@class='ag-center-cols-viewport']//following::*[contains(text(),'9317C-FLEXCRT12')]//following::*[@col-id='allocated' and text()='${quantity}']` 
const CONSUMED_CREDITS = (quantity:number) => `//*[@class='ag-center-cols-viewport']//following::*[contains(text(),'9317C-FLEXCRT12')]//following::*[@col-id='consumed' and text()='${quantity}']`
export class Entitlements extends Action {
    get allocateBtn() { return browser.$("(//*[contains(@label, 'Allocate')]//following::*[contains(text(),'Allocate')])[1]")}
    get trialFTRAEntitlement() {return browser.$('//*[ contains (text(),"Catalog: FTRA-TRIAL-01")]');}
    get trialFTOSEntitlement() {return browser.$('//*[ contains (text(),"Catalog: FTOS-TRIAL-01")]');}
    get purchaseFakeEntitlement() {return browser.$('//*[ contains (text(),"Purchase Fake entitlements")]');}
    get catalogCodeDropDown() { return $('//div[starts-with(@id,"mat-select-value")]');}
    get addEntitlementsBtn() {return browser.$('//*[ contains (text(),"Add entitlements")]');}
    get reviewAllocationBtn() {return browser.$('//*[ contains (text(),"Review Allocation")]');}
    get confirmAllocation() {return browser.$('//*[ contains (text(),"Confirm Allocation")]');}  
    get addonsType() {return browser.$('//*[ contains (text(),"Add-Ons")]');} 
    get additiveType() {return browser.$('//*[ contains (text(),"additive")]');} 
    get utilityType() {return browser.$('//*[ contains (text(),"Utility Token")]');} 
    get platformType() {return browser.$('//*[ contains (text(),"platform")]');}
    get partialAllocation() {return browser.$('//*[ contains (text(),"Allocate Partial Quantity")]');}
    get customQuantity() {return browser.$('//*[@formcontrolname="partialQty"]');}
    get allocatedEntitlementMessage() {return browser.$('//*[ contains (text(),"Service already has a platform entitlement allocated for the time period")]');} 
    get partialAllocateMessage() {return browser.$('//*[ contains (text(),"This value cannot be greater than 1000")]');} 
     

    public async allocateEntitlement(catalogNumber:string): Promise<void> {
      var allocateButton
      if(catalogNumber != null){
        allocateButton = await $(ALLOCATE_BTN(catalogNumber))
      }else{
        allocateButton = this.allocateBtn
      }
        await this.click(allocateButton);
        if (this.partialAllocation.isExisting()) {
          await this.click(this.partialAllocation);
        } else {
          await this.click(this.reviewAllocationBtn);
          await this.click(this.confirmAllocation);  
        }
    }

    public async allocatePartialCredits(quantity): Promise<void> {
      await this.enterText(this.customQuantity,quantity);
      try {
        await this.click(this.reviewAllocationBtn);
        await this.click(this.confirmAllocation); 
      } catch (error) {
        
      }
       

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

    public async consumedCredits(quantity:number): Promise<string> {
      let consumedCredits;
      try {
        consumedCredits = await $(CONSUMED_CREDITS(quantity)).getText();
      } catch (err) {
        consumedCredits = 0;
      }
      return consumedCredits;
  }

    public async purchase(entitlements): Promise<void> {
      await this.click(this.purchaseFakeEntitlement);
      await browser.pause(3000);
      await this.selectFromDropdown(this.catalogCodeDropDown, entitlements)
      await this.click(this.addEntitlementsBtn);
      await browser.pause(3000);
  }

    public getTrialFTRAEntitlement(): WebdriverIO.Element {
      return this.trialFTRAEntitlement;
  }

  public getTrialFTOSEntitlement(): WebdriverIO.Element {
    return this.trialFTOSEntitlement;
  }

    public getAddonType(): WebdriverIO.Element {
      return this.addonsType;
  }

  public getPlatformType(): WebdriverIO.Element {
    return this.platformType;
  }

  public getAdditiveType(): WebdriverIO.Element {
  return this.additiveType;
  }

  public getUtilityType(): WebdriverIO.Element {
  return this.utilityType;
  }

  public getAllocatedEntitlementMessage(): WebdriverIO.Element {
    return this.allocatedEntitlementMessage;
    }
}