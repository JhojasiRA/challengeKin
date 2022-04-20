import {When, Then } from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import {assert} from 'chai';
import {creds} from '../../constant.json';
import { acceptInvitation, createInvitationCall, getInvitationById, Invitation} from '../../services/Invitations';

var invitation: Invitation;


//-----------------create a new invitation--------------
When('it send an invitation POST {string}', async(endpoint) => {
    console.log(endpoint)
    });

Then('invites a new user as {string} level to the {string} service, response should be: status {string} ok', async (role:string,service:string,status) => {
    
        invitation = await createInvitationCall(creds.user + "@rockwellautomation.com",role,service);
        assert.equal(status,invitation.apiStatus);
      });

 Then('the user should see that the invitation gets {string}', async (status) => {
        assert.equal(status,invitation.status);
    });

//-----------------get invitations by Id---------------
When('it send an invitation GET {string}', async(endpoint) => {
  console.log(endpoint)
  });
  Then('the invitations should be: {string} ok', async (status) => {
    invitation= await getInvitationById();
    assert.equal(status,invitation.apiStatus);
      });
Then('the invitation status should be: {string}', async (status) => {
        assert.equal(status,invitation.status);
        });
Then('the resourceType invitation should be: {string}', async (resourcType) => {
        assert.equal(resourcType,invitation.resourceType);
        });

//-----------------Approve invitations-----------
When('it send an invitation POST to accept {string}', async(endpoint) => {
  console.log(endpoint)
  });

Then('invitation response once was approved should be: {string} ok', async (status) => {
  let approveInvitation= await acceptInvitation();
  assert.equal(status,approveInvitation);
    });
