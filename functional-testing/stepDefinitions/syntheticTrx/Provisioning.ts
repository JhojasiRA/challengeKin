import {Given, When, Then} from '@cucumber/cucumber'
import { menuhomepage, organization, question, approveUser, topBar, indexPage, externalAccount, homePage, entitlements, provisioning, action } from '../../support/Hooks';
import pause from 'webdriverio/build/commands/browser/pause';
import { Provisioning } from '../../src/pages/Provisioning';
import waitUntil from 'webdriverio/build/commands/browser/waitUntil';


Given('the user creates an organization', async() =>{
  await menuhomepage.createOrganizationOption();
  await organization.newOrganization();
});

Given('the user purchases an {string} entitlement', async (entitlement: string) =>{
  await  menuhomepage.entitlementsOption();
   await entitlements.purchase(entitlement);
});

When('the user allocates the entitlement', async () =>{
  await  entitlements.allocateEnt();
});

When('user closes the browser and opens it again', async () =>{
  await browser.closeWindow();
});

Then('user can see {string}', async () =>{
  await  homePage.dashboard();
});

Then('user can see logo is not clickable', async () =>{
  await question.assertElementNotClickable(provisioning.provisioningLogo);
});

When('user refresh the page', async () =>{
  await browser.pause(5000);
  await action.refreshPage();
  await browser.pause(5000);
});

Then('user can see the dashboard', async () =>{
  await question.assertElementExist(homePage.AllApps);
});

Then('user can see the click', async () =>{
  await browser.url(process.env.PORTAL_URL);
});





