import { Given, When, Then } from '@cucumber/cucumber'
import { createInvitation, getInvitationById, Invitation } from '../../services/Invitations';
import { menuhomepage, inviteUsersPage, question, invitationManagementPage } from '../../support/Hooks';
import chai = require('chai')
import chaiDateTime from 'chai-datetime';

chai.use(chaiDateTime)
const expect = chai.expect

var invitation: Invitation;
var initialSentDate: Date

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


