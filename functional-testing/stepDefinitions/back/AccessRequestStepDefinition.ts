import {When, Then } from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import {assert} from 'chai';
import {createOrgTenant,createAccesRequest,getAccesRequestById,getAccesRequestByTenant,deleteAccesRequestById,approveAccesRequest} from '../../services/AccesRequest';

//-----------------create a new access request-----------
When('it sends an access request POST {string}', async(endpoint) => {
    console.log(endpoint)
    });

Then('creates a new access request response should be: status {string} ok', async (status) => {
    await createOrgTenant();
    let newAccessReques = await createAccesRequest();
          assert.equal(status,newAccessReques.status);
      });
//-----------------Delete an access request-----------
      When('it sends a request to revoke the currently access request {string}', async(endpoint) => {
        console.log(endpoint)
        });
    
    Then('revoke an access request response should be: status {string} ok', async (status) => {
        let deleteAccessReques = await deleteAccesRequestById();
              assert.equal(status,deleteAccessReques);
          });
//-----------------access request id not found-----------
When('it sends an access request GET {string}', async(endpoint) => {
    console.log(endpoint)
    });

Then('the response GET should be: {string} not found', async (status) => {
    let accessRequestById= await getAccesRequestById();
    assert.equal(status,accessRequestById.status);
      });
    
//-----------------recreate a new access request-----------

//-----------------Gets an access request by id-----------
Then('the access request response should be: {string} ok', async (status) => {
    let accessRequestById= await getAccesRequestById();
    assert.equal(status,accessRequestById.status);
      });
Then('the access request status should be: {string}', async (status) => {
        let accessRequestById= await getAccesRequestById();
        assert.equal(status,accessRequestById.condition);
          });
//-----------------Gets access requests in the current tenant-----------
When('it sends an GET access request {string}', async(endpoint) => {
    console.log(endpoint)
    });

Then('the GET access request response should be: {string} ok', async (status) => {
    let accessRequestByTenant= await getAccesRequestByTenant();
    assert.equal(status,accessRequestByTenant);
      });
//-----------------Approve an access request-----------
When('it sends an access requests POST to approve {string}', async(endpoint) => {
    console.log(endpoint)
    });

Then('the access request approve response should be: {string} ok', async (status) => {
    await browser.pause(2000);
    let approveRequest= await approveAccesRequest();
    assert.equal(status,approveRequest);
      });
Then('the access request GET status should be: {string}', async (status) => {
        let accessRequestById= await getAccesRequestById();
        assert.equal(status,accessRequestById.condition);
          });