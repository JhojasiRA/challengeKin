import {Given, When, Then, Before } from '@cucumber/cucumber'
import { menuhomepage, organization, question, approveUser, topBar, indexPage, externalAccount, homePage, entitlements } from '../../support/Hooks';


Given('user purchases an {string} entitlement', async (entitlement: string) =>{
  await  menuhomepage.entitlementsOption();
   await entitlements.purchaseAddons(entitlement);
});

When('user allocates the entitlement', async () =>{
  await  entitlements.allocateEntitlement(null);
  await  menuhomepage.entitlementsOption();
});

Then('user can see the {string} type in the organization entitlements', async (type: string) =>{
  await question.assertElementText(entitlements.addonsType,type);
});

Then('user should see the {string} type in the organization entitlements', async (type: string) =>{
  await question.assertElementText(entitlements.additiveType,type);
});

Then('user can see {string} type in the organization entitlements', async (type: string) =>{
  await question.assertElementText(entitlements.utilityType,type);
});

Given('user creates an organization', async() =>{
   await menuhomepage.createOrganizationOption();
   await organization.newOrganization();
});
Then('user can see the {string} in the organization entitlements', async (type: string) =>{
  await question.assertElementText(entitlements.platformType,type);
});


