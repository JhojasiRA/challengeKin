import {Given, When, Then } from '@cucumber/cucumber'
import { menuhomepage, organization, question,entitlements } from '../../support/Hooks';


Given('user purchases an {string} entitlement', async (entitlement: string) =>{
  await  menuhomepage.entitlementsOption();
   await entitlements.purchase(entitlement);
});

When('user allocates the entitlement', async () =>{
  await entitlements.allocateEntitlement(null);
});

When('user allocates {string} credits', async (quantity:string) =>{
  await entitlements.allocateEntitlement(null);
  await entitlements.allocatePartialCredits(quantity);
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

When('user tries to purchase another {string} entitlement', async (entitlement: string) =>{
  await  browser.refresh();
  await browser.pause(1000);
  await  menuhomepage.entitlementsOption();
  await entitlements.purchase(entitlement);
  await entitlements.allocateEntitlement(null);
});

Then('user should see {string} message', async (allocatedMessage: string) =>{
  await question.assertElementText(entitlements.allocatedEntitlementMessage,allocatedMessage);
});

Then('user should not be able to allocate it {string}', async (partialallocateMessage) =>{
  await question.assertElementText(entitlements.partialAllocateMessage,partialallocateMessage);
});