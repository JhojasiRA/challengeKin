import {Given, When, Then, Before } from '@cucumber/cucumber'
import { joinRequest } from '../../services/JoinTenant';
import { AccesManagement } from '../../src/pages/AccessManagement';
import { menuhomepage, organization, question, approveUser, topBar, indexPage, externalAccount, homePage, entitlements } from '../../support/Hooks';
import pause from 'webdriverio/build/commands/browser/pause';


Given('user purchases an {string} entitlement', async (entitlement: string) =>{
  await  menuhomepage.entitlementsOption();
   await entitlements.purchaseAddons(entitlement);
});

When('user allocates the entitlement', async () =>{
  await  entitlements.allocateEnt();
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


