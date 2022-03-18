import {setDefaultTimeout,Given,When, Then } from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import { indexPage,eula,homePage,question,externalAccount } from '../../support/Hooks';

setDefaultTimeout(60 * 1000);
 
Given('the user open the Le Mans portal', async() => {
  //browser.waitForAngularEnabled(false);
  await browser.url(process.env.PORTAL_URL);
});

When('the user submit the form with its credentials', async() => {
  await indexPage.goToSignIn();
  await externalAccount.submitForm(process.env.USERNAME,process.env.PASSWORD);
});

When('the user accept the EULA testing eula {string}', async(testingEula:string) => {
  await browser.pause(2000);
  await eula.acceptEula(testingEula);
});

Then('the user should see the {string} page', async(MessageHomePage) => {
  await question.assertElementText(homePage.getMessageHome(),MessageHomePage);
});