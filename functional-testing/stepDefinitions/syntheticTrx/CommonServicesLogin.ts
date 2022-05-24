import { Given, When, Then } from '@cucumber/cucumber'
import { indexPage,eula,homePage,question,externalAccount } from '../../support/Hooks';
 
Given('the user opens the Le Mans portal', async() => {
  await indexPage.open('')
});

When('the user submits the form with its credentials', async() => {
  await indexPage.goToSignIn();
  await externalAccount.submitForm(process.env.USERNAME,process.env.PASSWORD);
});

When('the user accepts the EULA testing eula {string}', async(testingEula:string) => {
  await browser.pause(5000);
  await eula.acceptEula(testingEula);
});

When('the user logs in with MyRockwell-SAML', async() => {
  await indexPage.goToSignIn();
  await externalAccount.loginWithSAML(process.env.RA_USERNAME,process.env.RA_PASSWORD);
});

Then('the user should see the {string} page', async(MessageHomePage) => {
  await question.assertElementText(homePage.getMessageHome(),MessageHomePage);
});