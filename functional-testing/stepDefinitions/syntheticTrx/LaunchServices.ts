import {Given, When, Then } from '@cucumber/cucumber'
import { indexPage,homePage,question,topBar } from '../../support/Hooks';

let currentURL = "";

Given(/^the user has allocated a new FTRA entitlement$/, () => {
  
	return true;
});


When('the user launches the vault card', async() => {
  await homePage.launchVault();
});

Then('the user should see the {string} page of controller project', async(message) => {
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
  await browser.pause(3000);
  await homePage.launchFTRA();
});
Then('the user does not have access to the FTRA service', async() => {
  await question.assertElementPresent((homePage.getFTRACard()));
});

When('the user launches the Fiix card', async() => {
  await homePage.launchFiix();
});

Then('the user sees page with the title {string}', async(title:string) => {
  await question.assertTexts(await browser.getTitle(), title)
});

When('the user launches the Foo card', async() => {
  await homePage.launchFoo();
});

Then('the user does not have access to the Foo service', async() => {
  await question.assertElementPresent((homePage.lockFooIcon));
});

When('the user launches the UNIQO card', async() => {
  await homePage.launchUniqo();
});

Then('the user does not have access to the UNIQO service', async() => {
  await question.assertElementPresent((homePage.lockUniqoIcon));
});

When('the user launches the EaaS card', async() => {
  await homePage.launchEaas();
});

Then('the user does not have access to the EaaS service', async() => {
  await question.assertElementPresent((homePage.lockEaasIcon));
});


