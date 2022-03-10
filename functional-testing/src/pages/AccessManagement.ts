import {Action} from '../globalTasks/Action'

const USER_IN_TABLE = (usermail:string, resource:string) => `//*[@col-id='userEmail' and text()='${usermail}']/following-sibling::*[@col-id='resourceTypeForUI' and text()='${resource}']`
const ROLE_BUTTON = (role:string) => `//span[@class='mat-button-toggle-label-content' and text()='${role}']`
const REMOVE_ACCESS_BTN = (usermail:string, resource:string) => `//*[@col-id='userEmail' and text()='${usermail}']/following-sibling::*[@col-id='resourceTypeForUI' and text()='${resource}']/ancestor::*[@role='row']/descendant::*[@id='ag-remove-access-btn']`
export class AccesManagement extends Action {
    get addAccessButton () { return $("//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'add access')]")}
    get searchBar () { return $("#mat-chip-list-input-0")}
    get userList () { return $("#cdk-overlay-0")}
    get resourceTypeSelect () { return $("#resourceType_select")}
    get resourceNameSelect () { return $("#resourceName_select")}
    get roleSelect () { return $("#resourceName_select'")}
    get addButton () { return $("//button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'add')]")}
    get saveButton () { return $("//button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'save')]")}
    get selectResourceType () { return $("#mat-select-value-1'")}
    get selectResource () { return $("#mat-select-value-3")}
    get selectRole () { return $("#mat-select-value-5")}
    get removeOption () { return $("//*[@id='cdk-overlay-0']/descendant::button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'remove')]")}
    get accessRemovedMsg () { return $("//*[contains(text(), 'Access has been removed successfully')]")}
    get cancelOption () { return $("//*[@id='cdk-overlay-0']/descendant::button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'cancel')]")}
    

    public async addAccessHome(user):Promise<void>{
        var handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        
        await this.click(this.addAccessButton);
        //global.lastError = 'search bar button was not located'
        await this.enterText(this.searchBar,user);
        await this.click(this.userList);
    }
    public async addTenant():Promise<void>{
        await this.click(this.resourceTypeSelect);
        await browser.keys("\uE007") 
        await this.click(this.resourceNameSelect);
        await browser.keys("\uE007") 
        await await browser.keys("\uE00C") 
        
        await this.click(this.roleSelect);
        await browser.keys("\uE007")
        await this.click(this.addButton);
    }

    public async modifyAccess(usermail: string, resource: string, role: string): Promise<void> {
        const userInTable = await $(USER_IN_TABLE(usermail, resource))
        const roleButton = await $(ROLE_BUTTON(role));
        await this.click(userInTable)
        await this.click(roleButton)
        await this.click(this.saveButton);
    }

    public async removeAccess(usermail: string, resource: string, role: string): Promise<void> {
       // global.lastError = 'Error while removing access to user ' + usermail;
        const removeAccessBtn = await $(REMOVE_ACCESS_BTN(usermail, resource))
        await this.click(removeAccessBtn)
        await this.click(this.removeOption)
        await this.waitForElementPresent(this.accessRemovedMsg)
    }

    public async cancelRemoveAccess(usermail: string, resource: string): Promise<void> {
       // global.lastError = 'Error while removing access to user ' + usermail;
        const removeAccessBtn = await $(REMOVE_ACCESS_BTN(usermail, resource))
        await this.click(removeAccessBtn)
        await this.click(this.cancelOption)
    }

    public async addAccess(usermail: string, resource: string, role: string): Promise<void> {
        await this.click(this.addAccessButton)
        await this.selectFromDropdown(this.searchBar, usermail)
        await this.selectFromDropdown(this.selectResourceType, "Service")
        await this.selectFromDropdown(this.selectResource, resource)
        await this.selectFromDropdown(this.selectRole, role)
        await this.click(this.addButton)
        await this.click(this.saveButton)
    }

}