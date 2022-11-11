import { Given, When, Then } from '@cucumber/cucumber'
import { createInvitation, getInvitationById, Invitation } from '../../services/Invitations';
import { menuhomepage, inviteUsersPage, question, invitationManagementPage,homePage,indexPage,topBar } from '../../support/Hooks';
import chai = require('chai')
import chaiDateTime from 'chai-datetime';
import MailosaurClient = require('mailosaur');

chai.use(chaiDateTime)
const expect = chai.expect

var invitation: Invitation;
var initialSentDate: Date

const API_KEY = 'BWgGLl6gHnHGektK';
const mailosaur = new MailosaurClient(API_KEY)
const serverId = 'hfdfqcah';

When('the user invites {string} to the resource {string} with role {string}', async(usermail: string, resource: string, role:string) =>  {
  await menuhomepage.inviteUsersOption();
  await inviteUsersPage.inviteUser(resource, role, usermail);
});

Then('user should see the invitation is carried out successfully', async () => {
  await question.verifyActiveInvitation()
});

Then('user should see all the invitations are carried out successfully', async () => {
  await question.verifyActiveInvitation()
});

Given('an invitation has been made to the user {string} with the role {string} to the resource {string}', async (user: string, role: string, resource:string) => {
  invitation = await createInvitation(user, role, resource)
  initialSentDate = new Date(invitation.sentDate)
});
 
When('the user resends the invitation to the user mentioned', async () => {
  await menuhomepage.invitationManagementOption()
  await invitationManagementPage.resendActiveInvitation()
});

Then('user should see that the invitation is resent successfully', async () => {
  invitation = await getInvitationById()
  let finalSentDate = new Date(invitation.sentDate)
  expect(finalSentDate).to.be.afterTime(initialSentDate)
  
});

When('the user tries to cancel the active invitation', async () => {
  await menuhomepage.invitationManagementOption()
  await invitationManagementPage.cancelActiveInvitation()
});

Then('the user should see that the invitation gets canceled successfully', async () => {
    invitation = await getInvitationById()
    expect(invitation).to.be.equal(404)
}); 

When('Mailosaur gets the invitation URL and navigates the url', async () => {
  const inviteEmail = 'mailosaur-test1@hfdfqcah.mailosaur.net';
  const searchCriteria = {
    sentTo: inviteEmail,
  };
const message = await mailosaur.messages.get(serverId, searchCriteria);
const joinNowLink = message.html.links[0];  //joinNowLink.href (link)  , joinNowLink.text (Join now)
await browser.pause(3000);
await topBar.signOutOption();
await indexPage.openInvitUrl(joinNowLink.href);
});

Then('the user should see an {string}', async(invitationMessage) => {
  await question.assertElementText(homePage.getInvitationMessage(),invitationMessage);
});


