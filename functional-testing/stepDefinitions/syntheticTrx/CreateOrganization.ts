import {setDefaultTimeout, When, Then, After} from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import { editTenantInfoWithParams } from '../../services/Tenants';
import { menuhomepage,organization,question } from '../../support/Hooks';
import {defaultOrg} from '../../constant.json'

setDefaultTimeout(60 * 1000);
When('the user go inside to create organization option', async() => {
    await browser.pause(2000);
    await menuhomepage.createOrganizationOption();
  });
When('the user submit the form with its information', async() => {
    await browser.pause(2000);
    await organization.newOrganization();
});  
  Then('the user should see the message {string}', async(message) => {
      await browser.pause(2000);
      await question.assertElementText(organization.getMessageCreateOrganization(),message);
      await organization.ok();
    });

When('the user submit the form with its name', async() => {
      await organization.cancelCreation();
  });  
   Then('User should see a message pop up: {string}', async(DiscardChangemessage) => {
        await browser.pause(2000);
        await question.assertElementText(organization.getDiscardChangesMessage(),DiscardChangemessage);
        await organization.continue();
      });


When('the user go inside to edit organization option', async() => {
  await browser.pause(2000);
  await menuhomepage.editOrganizationOption();
  }); 
When('the user submit the form with new information', async() => {
  await browser.pause(2000);
    await organization.editOrganization();
}); 
  Then('the user will see the message {string}', async(message) => {
  await browser.pause(2000);
  await question.assertElementText(organization.getMessageEditOrganization(),message);
  await organization.ok();
}); 

When('the user changes the description but then cancel the edition', async() => {
  await organization.canceleditOrganization();
}); 

When('User generate a new invide code', async() => {
  await organization.newInviteCode();
}); 
Then('User will see a success message and will be able to close it', async() => {
  await organization.ok();
}); 

After('@afterEditOrganization', async() =>{
  global.lastError = "Error while doing the test teardown editing organization name"
  await editTenantInfoWithParams(defaultOrg.name, defaultOrg.location, defaultOrg.description, defaultOrg.visibility);
});
