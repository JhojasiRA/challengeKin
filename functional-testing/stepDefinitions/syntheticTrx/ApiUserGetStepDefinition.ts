import {When, Then } from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import {assert} from 'chai';
import {getUserId, createUser,getEula, getUser,getUserWithOtherToken,getEffectiveRoles, createUser2,createOrgTenant,editTenantInfo,getEntitlements} from '../../services/Users';

//------------------create new users-------------
When('it send a POST {string}', async(endpoint) => {
        await getEula();
        console.log(endpoint)
        });

Then('Response should be: status {string} ok', async(status) => {
        let statuscreate = await createUser(); 
        assert.equal(status ,statuscreate);
        await browser.pause(2000);
     });

     Then('Response new user2 should be: status {string} ok', async (status) => {
        let statuscreate = await createUser2(); 
        assert.equal(status ,statuscreate);
        await browser.pause(2000);
     }); 

Then('create a user exist response should be: status {string} useralreadyexist', async(status) => {
        let create = await createUser(); 
         assert.equal(status,create);
        });

//------------get a user by Id------------------
When('it send a GET {string}', async(endpoint) => {
            await getUserId();
            console.log(endpoint);
            });
            
    Then('Should be: status {string} ok', async (status) => {
                  let statusget = await getUser();
                  assert.equal(status,statusget.status);
        });

//-------------------Create an org tenant----------
When('it send a request post to create a org tenant {string}', async(endpoint) => {
        console.log(endpoint)
        });
Then('org tenant response should be: status {string} ok', async(status) => {
        let orgTenant = await createOrgTenant();
        assert.equal(status,orgTenant.status);
        await browser.pause(4000);
});

//-------------------Edit an org tenant----------
When('it send a put request to edit organization {string}', async(endpoint) => {
        console.log(endpoint)
        });
Then('edit org tenant response should be: status {string} ok', async(status) => {
        let orgModified = await editTenantInfo();
        assert.equal(status,orgModified);
       await browser.pause(4000);
});
  //-----------------get a user by effective roles   
When('it send a effective request GET {string}', async(endp) => {
        console.log(endp)
        });

Then('The effective response should be: status {string} ok', async(status) => {
        let effectiveRoles = await getEffectiveRoles(); 
        assert.equal(status,effectiveRoles.status);
  });       
Then('The effective resourceType should be: {string}', async(resourceType) => {
  let effectiveRoles = await getEffectiveRoles(); 
  assert.equal(resourceType,effectiveRoles.resourceType);
  });
Then('The effective role should be: {string}', async(role) => {
  let effectiveRoles = await getEffectiveRoles(); 
  assert.equal(role,effectiveRoles.role);
  });
Then('The effective resourceName should be: {string}', async(resourceName) => {
  let effectiveRoles = await getEffectiveRoles(); 
  assert.equal(resourceName,effectiveRoles.resourceName);
  });
Then('The effective resourceType1 should be: {string}', async(resourceName) => {
  let effectiveRoles = await getEffectiveRoles(); 
  assert.equal(resourceName,effectiveRoles.resourceType1);
  });
Then('The effective default service should be: {string}', async(resourceName) => {
  let effectiveRoles = await getEffectiveRoles(); 
  assert.equal(resourceName,effectiveRoles.resourceName1);
  });

//-----------User Entitlements
When('it send a entitlements request GET {string}', async(endpoint) => {
        console.log(endpoint);
});

Then('the response of the user entitlements should be: {string} ok', async (status) => {
      let statusEntitlement = await getEntitlements();
      assert.equal(status,statusEntitlement);
    });

//---------Not allows users access to other users profiles
Then('user access to other users profile should be status: {string} Forbidden', async(status) => {
        let userStatus = await getUserWithOtherToken();
        assert.equal(status,userStatus); 
});