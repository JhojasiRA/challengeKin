import {Given, When, Then } from '@cucumber/cucumber'
import { joinRequest } from '../../services/JoinTenant';
import { menuhomepage, organization, question, approveUser ,topBar,indexPage,externalAccount,accesManagement } from '../../support/Hooks';

When('User1 copy a new invite code', {timeout: 2 * 5000}, async() => {
    await organization.inviteCode();
  });

When('User1 give to user2 an invite code', async() => { 
  await browser.pause(3000);
  await topBar.signOutOption();
});
When('User2 sign in on his account', async() => {   
     await browser.url(process.env.PORTAL_URL);
     await indexPage.goToSignIn();
     await externalAccount.submitForm("testuser21", process.env.PASSWORD);
});


When('User2 go inside to the option join request', async() => {
    await menuhomepage.joinOrganizationOption();
});
When('User2 send a join request', async() => {
  await organization.joinRequest();
});

Then('the user2 will see a message pop up: {string}', async(MessageSentRequest) => {
  await browser.pause(3000);
  global.lastError = 'could not get message successfully join request message'
  await question.assertElementText(organization.getMessageJoinRequest(),MessageSentRequest);
  await organization.ok();
});


When('User1 go to approve user option', async() => {
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

When('User1 accept the successfully message', async() => {
  await browser.pause(2000);
  await organization.ok();
});

When('User2 try to send a join request with a outdate invite code', async() => {
  await browser.pause(3000);
  await organization.joinRequestWithOutDateCode();
});
Then('User2 will see the continue button disabled', async() => {
  await browser.pause(3000);
  await question.assertElementNotClickable((organization.ContinueButton()));
  });

Given('user {string} has applied a join request to the last accessed organization of current user', async(user:string) => {
  await joinRequest(user)
})

When('the user tries to approve the join request with role {string}', async(role: string) => {
  await menuhomepage.approveUserOption();
  await approveUser.approveJoinRequest(role)
})

Then('the user should see that the access has been granted', async() => {
  await question.assertElementPresent(approveUser.userApprovedMessage)
})

Then('the user should see that {string} has access to to the approved resourced with the role {string}', async(user: string, role: string) => {
  await menuhomepage.accessManagementOption()
  const USER_IN_TABLE = (user:string, role:string) => `//*[@col-id='userEmail' and contains(text(),'${user}')]/following-sibling::*[@col-id='resourceTypeForUI' and text()='Organization']/following-sibling::*[@col-id='role' and text()='${role}']`
  await question.assertElementPresent($(USER_IN_TABLE(user,role)))
})