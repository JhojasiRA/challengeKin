import { When, Then } from '@cucumber/cucumber';
import { topBar, indexPage, question } from '../../support/Hooks';


When('the user go inside on the help icon', async () => {
    await topBar.helpIconTool();
});

When('the user go inside on Online help option', async () => {
    await topBar.onlineHelpTool();
});
Then('the user should see the page {string}', async (pageTittle) => {
    await browser.pause(3000);
    await question.assertElementContainsText(topBar.pageTitle, pageTittle)
});

When('the user go inside on getting started option', async () => {
    await topBar.gettingStartedTool();
});
Then('the user should see {string} page tittle', async (pageTittle) => {
    await browser.pause(3000);
    await question.assertElementText(topBar.pageTitle, pageTittle);
});

When('the user go inside on provide feedback option', async () => {
    await topBar.provideFeedbackTool();
});

When('the user go inside on Release Notes', async () => {
    await topBar.releaseNotesTool();
});
Then('the user should see page with title {string}', async (pageTittle) => {
    await browser.pause(3000);
    await question.assertElementContainsText(topBar.pageTitle, pageTittle);
});

When('the user click on about option', async () => {
    await topBar.aboutTool();
});

When('the user click on its profile', async () => {
    await topBar.signOutOption();
});

Then('the user should see the login page', async () => {
    await question.assertElementExist(indexPage.signInButton)
});