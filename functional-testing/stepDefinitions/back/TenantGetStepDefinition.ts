import {When, Then } from '@cucumber/cucumber';
import 'regenerator-runtime/runtime';
import {assert} from 'chai';
import {getTenant,getTenantId,getTenantResourceRole,getTenantResources,getTenantResourceId,editTenantInfo,getUserId} from '../../services/Tenants';

//---------------get new Tenant role-------
When('tenant GET {string}', async(endpoint) => {
    console.log(endpoint)
    });
    
    Then('tenant Should be: status {string} ok', async (status) => {
          let tenant = await getTenantId(global.accessToken); 
          assert.equal(status,tenant.status);
      });

    Then('tenant role by default should be: {string}', async(status) => {
        let tenant = await getTenantId(global.accessToken); 
        assert.equal(status,tenant.role);
    });
//------------get a tenant by resource roles----------
When('the tenant send a request GET {string}', async(endpoint) => {
        console.log(endpoint);
        });
        
    Then('tenant Status Should be: {string} ok', async (status) => {
              let statusrole = await getTenantResourceRole(); 
              assert.equal(status,statusrole);
          });
//-----------get a tenant by roles----------
 When('the tenant request GET {string}', async(endpoint) => {
        console.log(endpoint)
        });
        
    Then('The response tenant should be: status {string} ok', async (status) => {
              let statusresource = await getTenantResources(); 
              assert.equal(status,statusresource);
          });
//----------get a tenant resource by id------
When('Tenant resource id request GET {string}', async(endpoint) => {
    console.log(endpoint)
    });
    
    Then('The expected tenant response should be: status {string} ok', async (status) => {
          let statuscreate = await getTenantResourceId(); 
          assert.equal(status,statuscreate);
      });

//------------get a org tenant info by Id------------
When('it send a tenant GET {string}', async(endpoint) => {
    await getUserId(global.accessToken);
    console.log(endpoint);
    await browser.pause(2000);
    await getTenantId(global.accessToken); 
            });
    Then('The tenant response Should be: status {string} ok', async(status) => {
        let tenant = await getTenant(); 
        assert.equal(status,tenant.status);
            });
    Then('The tenantStatus should be: {string}', async(status) => {
        let tenant = await getTenant(); 
        assert.equal(status,tenant.tenantStatus);
            });
    Then('The new tenant emailDomain should be: {string}', async(status) => {
        let tenant = await getTenant(); 
        assert.equal(status,tenant.emailDomain);
            });

    Then('The name response of tenant should be: {string}', async(name) => {
        let tenant = await getTenant(); 
        assert.equal(name,tenant.name);
            });
            
    Then('The description should be: {string}', async(description) => {
            let tenant = await getTenant(); 
            assert.equal(description,tenant.description);
                });    
    Then('the location should be: {string}', async(location) => {
            let tenant = await getTenant(); 
            assert.equal(location,tenant.location);
                }); 
    Then('the visibility should be: {string}', async(visibility) => {
            let tenant = await getTenant(); 
            assert.equal(visibility,tenant.visibility);
                }); 

//-----------------Edit visibility and org tenant info
When('it send a PUT request {string}', async(endp) => {
    console.log(endp)
    });

Then('The response edit tenant info should be: status {string} ok', async(status) => {
    await getTenantId(global.accessToken); 
    let organization = await editTenantInfo();
    assert.equal(status,organization);
});   