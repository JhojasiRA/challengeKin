import {Given, When, Then, After } from '@cucumber/cucumber'
import { activateEntitlement, deactivateEntitlement } from '../../services/Entitlements';
import { indexPage,homePage,question,topBar, menuhomepage, entitlements, inviteUsersPage } from '../../support/Hooks';
import { catalogNumberEntitlements } from '../../constant.json'

Given(/^the user has allocated a new "([^"]*)" entitlement with email "([^"]*)" and valid for "([^"]*)" days$/, async(entitlementType, email,validForDays) => {
  let effectiveDate = new Date()
  //@ts-ignore
  await browser.setupInterceptor()
  await menuhomepage.entitlementsOption()
  await browser.pause(2000)
  //@ts-ignore
  let requests = await browser.getRequests(false, false)
  let requestEntitlements = requests.filter(request => request.url.startsWith(process.env.API_CS))[0]
  let token = requestEntitlements.headers.authorization
  let catalogNumber = null
  let serviceKind = null;
  switch(entitlementType) {
    case 'FTRA':
      catalogNumber = catalogNumberEntitlements.FTRA.catalogNumber
      serviceKind = catalogNumberEntitlements.FTRA.serviceKind
      break;
    case 'Vault':
      catalogNumber = catalogNumberEntitlements.Vault.catalogNumber
      serviceKind = catalogNumberEntitlements.Vault.serviceKind
      break;
    default: 
  }
  if(typeof token === 'string'){
    token = token.split(' ')[1]
  }else{
    throw new Error("Service intercepted does not have a token header param: "+requestEntitlements.url)
  }
  await activateEntitlement(email,effectiveDate.toDateString(),validForDays, 1, catalogNumber, serviceKind, token)
  await browser.refresh()
  await entitlements.allocateEntitlement(catalogNumber)
  await browser.pause(1000)
  await inviteUsersPage.closeInvitation()
});

let currentURL = "";
After('@teardownAddEntitlement',async() =>{
  await deactivateEntitlement()
});


When('the user launches the vault card', async() => {
  await homePage.launchVault();
});

Then('the user should see the {string} page of controller project', async(message) => {
    await browser.pause(10000); //ISSUE VAULT
    await question.assertElementText(homePage.getVaultView(),message);
  });

When('the user signs out the home page', async() => {
  await browser.pause(3000);
  await homePage.newBrowser();
  await browser.pause(3000);
  await topBar.signOutOption();
});

When('the user logs out', async() => {
  await topBar.signOutOption();
  currentURL =await browser.getUrl();
});

Then('the user should see logout page', async() => {
  await browser.pause(3000);
  await question.assertElementExist(indexPage.signInButton);
  await question.assertTextContains(currentURL, process.env.PORTAL_URL);
});

When('the user launches the FTRA card', async() => {
  await homePage.launchFTRA();
});
Then('the user does not have access to the FTRA service', async() => {
  await question.assertElementPresent((homePage.getFTRACard()));
});

When('the user launches the Fiix card', async() => {
  await homePage.launchFiix();
});

Then('the user sees page with the title {string}', async(title:string) => {
  let handles = await browser.getWindowHandles()
  if(handles.length > 1)
        await browser.switchToWindow(handles[1])
  await question.assertTexts(await browser.getTitle(), title)
});

When('the user launches the Foo card', async() => {
  await homePage.launchFoo();
});

Then('the user does not have access to the Foo service', async() => {
  await question.assertElementPresent((homePage.lockFooIcon));
});

When('the user launches the FTOptix card', async() => {
  await homePage.launchOptix();
});

Then('the user does not have access to the UNIQO service', async() => {
  await question.assertElementPresent((homePage.lockUniqoIcon));
});

When('the user launches the EaaS card', async() => {
  await homePage.launchEaaS();
});






