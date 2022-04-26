import {When, Then } from '@cucumber/cucumber'
import { indexPage,homePage,question,topBar } from '../../support/Hooks';

When('the user launch the vault card', async() => {
  await homePage.launchVault();
});

Then('the user should see the {string} page of controller project', async(message) => {
    await question.assertElementText(homePage.getVaultView(),message);
  });

When('the user sign out the home page', async() => {
  await browser.pause(3000);
  await homePage.newBrowser();
  await browser.pause(3000);
  await topBar.signOutOption();
});

When('the user logs out', async() => {
  await topBar.signOutOption();
});

Then('the user should see logout page', async() => {
  await browser.pause(3000);
  await question.assertElementExist(indexPage.signInButton);
});

When('the user launch the FTRA card', async() => {
  await browser.pause(3000);
  await homePage.launchFTRA();
});
Then('the user does not have access to the FTRA service', async() => {
  await browser.pause(3000);
  await question.assertElementPresent((homePage.getFTRACard()));
});