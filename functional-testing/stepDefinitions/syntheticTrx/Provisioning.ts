import { When, Then} from '@cucumber/cucumber'
import { question, indexPage, externalAccount, homePage, provisioning, action } from '../../support/Hooks';

When('user closes the browser and opens it again', async () =>{
  await browser.closeWindow();
  await browser.reloadSession();
  await indexPage.open('');
  await indexPage.goToSignIn();
  await externalAccount.submitForm(process.env.USERNAME,process.env.PASSWORD);
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
Then('user can see {string} in Edge card in the dashboard', async (provisioningMessage) =>{
  await question.assertElementText(homePage.getClickProvisioningMessage(), provisioningMessage);
});







