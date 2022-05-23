import { When, Then } from '@cucumber/cucumber';
import { topBar, indexPage, question } from '../../support/Hooks';



When('the user goes inside on the help icon', async () => {
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

When('the user goes inside on Release Notes', async () => {
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

When('the user goes inside on provide feedback option', async () => {
    await topBar.provideFeedback();
});

When('the user submits the form with feedback information', async () => {
    await topBar.provideFeedbackInfo();
});
Then('user should not see the feedback modal', async () => {
    await browser.pause(3000);
    await question.assertElementNotExist(topBar.feedbackElement);
});


When('the user submits the form with enhancement request information', async () => {
    await topBar.EnhancementInfo();
});

When('the user submits the form with issue information', async () => {
    await topBar.issueInfo();
});

When('the user does not submit the form with text info', async () => {
    await topBar.NotFeedbackInfo();
    
});

Then('user should see a message {string}', async (feedRequiredMessage) => {
    await question.assertElementContainsText(topBar.getMessage(), feedRequiredMessage);
    await browser.pause(3000);
});







