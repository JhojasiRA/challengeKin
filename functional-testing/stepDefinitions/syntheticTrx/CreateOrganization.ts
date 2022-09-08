import {setDefaultTimeout, Given, When, Then, After} from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import { editTenantInfoWithParams } from '../../services/Tenants';
import { menuhomepage, organization, question, indexPage } from '../../support/Hooks';
import {defaultOrg} from '../../constant.json'

setDefaultTimeout(60 * 1000);
When('the user goes inside to create organization option', async() => {
    await menuhomepage.createOrganizationOption();
});

When('the user submits the form with its information', async() => {
    await organization.newOrganization();
});  

Then('the user will see a new {string} logo organization', async(src) => {
   await question.assertElementAttributeContains(organization.imageLogo, 'src', src);
  }); 

When('the user submits the form with its information and add an organization logo', async() => {
   await organization.newOrganizationWithLogo();
});  

Then('the user should see the message {string}', async(message) => {
   await question.assertElementText(organization.getMessageCreateOrganization(),message);
    });

When('the user submits the form with its name', async() => {
   await organization.cancelCreation();
});  

Then('User should see a message pop up: {string}', async(DiscardChangemessage) => {
   await browser.pause(1000);
    await question.assertElementText(organization.getDiscardChangesMessage(),DiscardChangemessage);
    await organization.continue();
});

Then('the user will see the message {string}', async(message) => {
    await question.assertElementText(organization.getMessageEditOrganization(),message);
  }); 

  Then('the user will see an organization with {string} logo', async(src) => {
   
   await menuhomepage.editOrganizationOption();
   await question.assertElementAttributeContains(organization.imageLogo, 'src', src);
}); 

Then('User will see a success message and will be able to close it', async() => {
   await organization.ok();
}); 

After('@afterEditOrganization', async() =>{
   global.lastError = "Error while doing the test teardown editing organization name"
   await editTenantInfoWithParams(defaultOrg.name, defaultOrg.location, defaultOrg.description, defaultOrg.visibility);
});

Then('user cant see the name in join organization option', async() => {
   await menuhomepage.joinOrganizationOption(); 
   await question.assertElementNotExist(organization.organizationName);
});

Given(/^the user has created a new organization with name "([^"]*)"$/, async(orgName:string) => {
	await menuhomepage.createOrganizationOption();
  let date = new Date();
  let organizationName= orgName+"_"+(date.getTime().toString())
  await organization.newOrg(organizationName);
});
When('the user submits the form with public organization information', async() => {
   await organization.publicOrganizationCreation();
});

Then('user can see the {string} in join organization option', async(organizationName) => {
   await menuhomepage.joinOrganizationOption(); 
   await question.assertElementText(organization.getMessageOrganizationName(),organizationName);
});


After('@after', async() =>{
   await menuhomepage.editOrganizationOption(); 
   await organization.editPublicOrganization();
});

When('the user edits the form selecting vault service', async() => {
   await organization.selectVaultService();  
});

When('the user submits the info but then user goes back', async() => {
   await organization.fillTheFields();  
});

When('the user submits the info with all services', async() => {
   await organization.fillTheFields();  
});

Then('user can see {string} in organization details', async(organizationDetails) => {
   await question.assertElementText(organization.getOrganizationDetailsMessage(),organizationDetails);
});

Given('the user creates a new organization with all service tiles with visibility {string}', async(flat) =>{
 if(flat === "ON"){
   await menuhomepage.createOrganizationOption();
   await organization.newOrganizationServicesON();
 } 
 else{
   await menuhomepage.createOrganizationOption();
   await organization.newOrganizationServicesOFF();
 }
});

When('user turns on Vault service visibility', async() => {
   await menuhomepage.editOrganizationOption();
   await organization.selectVault();
});

Then('user should see the Vault service in home', async() => {
   await menuhomepage.indexOption();
   await question.assertElementExist(indexPage.VaultCard);
});

When('user turns on Remote Access service visibility', async() => {
   await menuhomepage.editOrganizationOption();
   await organization.selectFTRA();
});

Then('user should see the Remote Access Service in home', async() => {
   await menuhomepage.indexOption();
   await question.assertElementExist(indexPage.FTRACard);
});

When('user turns on Design Studio service visibility', async() => {
   await menuhomepage.editOrganizationOption();
   await organization.selectDesignStudio(); 
});

Then('user should see the Design Studio service in home', async() => {
   await menuhomepage.indexOption();
   await question.assertElementExist(indexPage.DesignStudioCard);
});

When('user turns on Foo service visibility', async() => {
   await menuhomepage.editOrganizationOption();
   await organization.selectFoo();
});

Then('user should see the Foo service in home', async() => {
   await menuhomepage.indexOption();
   await question.assertElementExist(indexPage.FooCard);
});

When('user turns off Vault service visibility', async() => {
   await menuhomepage.editOrganizationOption();
   await organization.selectVault();
});

Then('user should not see the Vault service in home', async() => {
   await menuhomepage.indexOption();
   await question.assertElementNotExist(indexPage.VaultCard);
});

When('user turns off Remote Access service visibility', async() => {
   await menuhomepage.editOrganizationOption();
   await organization.selectFTRA();
});

Then('user should not see the Remote Access Service in home', async() => {
   await menuhomepage.indexOption();
   await question.assertElementNotExist(indexPage.FTRACard);
});

When('the user turns off Design Studio Service visibility', async() => {
   await menuhomepage.editOrganizationOption();
   await organization.selectDesignStudio();
});

Then('user should not see the Design Studio service in home', async() => {
   await menuhomepage.indexOption();
   await question.assertElementNotExist(indexPage.DesignStudioCard);
});

When('the user turns off Foo Service visibility', async() => {
   await menuhomepage.editOrganizationOption();
   await organization.selectFoo();
});

Then('user should see not the Foo service in home', async() => {
   await menuhomepage.indexOption();
   await question.assertElementNotExist(indexPage.FooCard);
});





