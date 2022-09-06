import {setDefaultTimeout, Given, When, Then, After} from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import { editTenantInfoWithParams } from '../../services/Tenants';
import { menuhomepage, organization, question } from '../../support/Hooks';
import {defaultOrg} from '../../constant.json'

setDefaultTimeout(60 * 1000);
When('the user goes inside to create organization option', async() => {
    await menuhomepage.createOrganizationOption();
});

When('the user submits the form with its information', async() => {
    await organization.newOrganization();
});  

When('the user adds a new logo organization', async() => {
    await organization.addNewLogoOrganization();
});

Then('the user will see a new {string} logo organization', async(src) => {
   await organization.ok();
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
    await question.assertElementText(organization.getDiscardChangesMessage(),DiscardChangemessage);
    await organization.continue();
});

When('the user goes inside to edit organization option', async() => {
   await menuhomepage.editOrganizationOption();
  }); 

When('the user submits the form with new information', async() => {
    await organization.editOrganization();

  });

Then('the user will see the message {string}', async(message) => {
    await question.assertElementText(organization.getMessageEditOrganization(),message);
  }); 
 
When('the user edits the logo organization', async() => {
   await organization.editLogoOrganization();
}); 

  Then('the user will see an organization with {string} logo', async(src) => {
   await organization.ok();
   await menuhomepage.editOrganizationOption();
   await question.assertElementAttributeContains(organization.imageLogo, 'src', src);
}); 

When('the user changes the description but then cancel the edition', async() => {
   await organization.canceleditOrganization();
}); 

When('User generates a new invide code', async() => {
   await organization.newInviteCode();
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
