import {Given, When, Then } from '@cucumber/cucumber'
import { joinRequest } from '../../services/JoinTenant';
import { AccesManagement } from '../../src/pages/AccessManagement';
import { menuhomepage, organization, question, approveUser, topBar, indexPage, externalAccount, homePage } from '../../support/Hooks';
import pause from 'webdriverio/build/commands/browser/pause';

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
     await externalAccount.submitForm("tester1", process.env.PASSWORD);
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
When('User1 dismisses the user2 request to join to the organization', async() => {
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

Then('the user should see that {string} has access to to the approved resource with the role {string}', async(user: string, role: string) => {
  await menuhomepage.accessManagementOption()
  const USER_IN_TABLE = (user:string, role:string) => `//*[@col-id='userEmail' and contains(text(),'${user}')]/following-sibling::*[@col-id='resourceTypeForUI' and text()='Organization']/following-sibling::*[@col-id='role' and text()='${role}']`
  await question.assertElementPresent($(USER_IN_TABLE(user,role)))
  AccesManagement.setUserToRevoke(user)
  AccesManagement.setAsset('Organization')
})

Given('user copies the organization code', async() => {
 await menuhomepage.editOrganizationOption();
 await organization.inviteCode();
})

When('the user tries to join to the organization', async() => {
  await menuhomepage.joinOrganizationOption();
  await organization.joinRequest();

})

Then('user should see a pop up message: {string}', async(MessageBadRequest) => {
  await question.assertElementText(organization.getBadRequestMessage(),MessageBadRequest);
});

Given('user1 creates an organization', async() => {
  await menuhomepage.createOrganizationOption();
  await organization.newOrganization();
  await menuhomepage.editOrganizationOption();
  await organization.inviteCode();
  await topBar.signOutOption();
});


When('user2 makes the request for the organization created before', async() => {
  await browser.url(process.env.PORTAL_URL);
  await indexPage.goToSignIn();
  await externalAccount.submitForm("tester1", process.env.PASSWORD);
  await menuhomepage.joinOrganizationOption();
  await organization.joinRequest();
  await organization.ok();
  await topBar.signOutOption();
})

When('user1 accepts the request of user2 with role {string}', async(role: string) => {
  await indexPage.goToSignIn();
  await externalAccount.submitForm(process.env.USERNAME, process.env.PASSWORD);
  await menuhomepage.approveUserOption();
  await approveUser.approveJoinRequest(role);
  await topBar.signOutOption();
})


When('user2 makes the same org request again', async() => {
  await indexPage.goToSignIn();
  await externalAccount.submitForm("tester1", process.env.PASSWORD);
  await menuhomepage.joinOrganizationOption();
  await organization.joinRequest();
  
})

Then('user should see a pop up message: {string}', async(MessageBadRequest) => {
  await browser.pause(1000);
  await question.assertElementText(organization.getBadRequestMessage(),MessageBadRequest);
});


     