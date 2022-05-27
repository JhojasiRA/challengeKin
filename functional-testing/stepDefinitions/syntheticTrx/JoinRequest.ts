import {When, Then } from '@cucumber/cucumber'
import { menuhomepage, organization, question, approveUser ,topBar,indexPage,externalAccount } from '../../support/Hooks';

When('User1 copies a new invite code', {timeout: 2 * 5000}, async() => {
    await organization.inviteCode();
  });

When('User1 gives to user2 an invite code', async() => { 
  await browser.pause(3000);
  await topBar.signOutOption();
});
When('User2 signs in on his account', async() => {   
     await browser.url(process.env.PORTAL_URL);
     await indexPage.goToSignIn();
     await externalAccount.submitForm("testuser21", process.env.PASSWORD);
   //  await homePage.dashboard();
});


When('User2 goes inside to the option join request', async() => {
    await menuhomepage.joinOrganizationOption();
});
When('User2 sends a join request', async() => {
  await organization.joinRequest();
});

Then('the user2 will see a message pop up: {string}', async(MessageSentRequest) => {
  await browser.pause(3000);
  global.lastError = 'could not get message successfully join request message'
  await question.assertElementText(organization.getMessageJoinRequest(),MessageSentRequest);
  await organization.ok();
});


When('User1 goes to approve user option', async() => {
  await browser.pause(3000);
  await menuhomepage.approveUserOption();
});
When('User1 dismiss the user2 request to join to the organization', async() => {
  await browser.pause(3000);
  await approveUser.Dismiss();
});
Then('the user1 will see a message pop up: {string}', async(MessageDismissRequest) => {
  await browser.pause(3000);
  await question.assertElementText(approveUser.getMessageDismissRequest(),MessageDismissRequest);
  await approveUser.DismissButton();
});

When('User1 accepts the successfully message', async() => {
  await browser.pause(2000);
  await organization.ok();
});

When('User2 tries to send a join request with a outdate invite code', async() => {
  await browser.pause(3000);
  await organization.joinRequestWithOutDateCode();
});
Then('User2 will see the continue button disabled', async() => {
  await browser.pause(3000);
  await question.assertElementNotClickable((organization.ContinueButton()));
  });