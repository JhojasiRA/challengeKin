import {setDefaultTimeout, Given, When, After} from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import { editTenantInfoWithParams } from '../../services/Tenants';
import { menuhomepage, organization } from '../../support/Hooks';
import {defaultOrg} from '../../constant.json'

setDefaultTimeout(60 * 1000);

When('the user adds a new logo organization', async() => {
    await organization.addNewLogoOrganization();
});

When('the user goes inside to edit organization option', async() => {
   await menuhomepage.editOrganizationOption();
  }); 

When('the user submits the form with new information', async() => {
    await organization.editOrganization();
  });

When('the user edits the logo organization', async() => {
   await organization.editLogoOrganization();
}); 

When('the user changes the description but then cancel the edition', async() => {
   await organization.canceleditOrganization();
}); 

When('User generates a new invide code', async() => {
   await organization.newInviteCode();
}); 

After('@afterEditOrganization', async() =>{
   global.lastError = "Error while doing the test teardown editing organization name"
   await editTenantInfoWithParams(defaultOrg.name, defaultOrg.location, defaultOrg.description, defaultOrg.visibility);
});

When('the user edits the form', async() => {
   await organization.selectPublicOrganizationEdit();
}); 

After('@after', async() =>{
   await menuhomepage.editOrganizationOption(); 
   await organization.editPublicOrganization();
});

When('the user edits the info of the form', async() => {
   await organization.selectPrivateOrganizationEdit();  
}); 

When('the user edits the form selecting vault service', async() => {
   await organization.selectVaultService();  
});

When('the user submits the info with all services', async() => {
   await organization.fillTheFields();  
});




