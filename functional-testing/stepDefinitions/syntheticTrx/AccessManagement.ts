import {Given, When, Then, After} from '@cucumber/cucumber';
import { joinLastaccessedTenant } from '../../services/JoinTenant'
import { menuhomepage, accesManagement as accessManagement, question } from '../../support/Hooks';
import { getTenantEffectiveRoles, getUserId } from '../../services/Tenants';
import { revokeRole } from '../../services/Users';
import { getToken5 } from '../../Token';
var jp = require('jsonpath')
var asset ='';
var userToRevoke='';


Given(/^the user "([^"]*)" has joined the last accessed tenant with role "([^"]*)"$/, async (user: string, role: string) => {
  await joinLastaccessedTenant(user, role)
});

When(/^the admin grants access to the user "([^"]*)" to the resource "([^"]*)" with role "([^"]*)"$/, async (user: string, resource: string, role: string) => {
  asset = resource
  await menuhomepage.accessManagementOption()
  await accessManagement.modifyAccess(user, resource, role)
});

When(/^the admin adds access to user "([^"]*)" to the service "([^"]*)" with role "([^"]*)"$/, async (user: string, service: string, role: string) => {
  asset = service
  await menuhomepage.accessManagementOption()
  await accessManagement.addAccess(user, service, role)
});

Then(/^the admin should see that the user "([^"]*)" has correct access to the resource "([^"]*)" with role "([^"]*)"$/, async (usermail: string, resource: string, role: string) => {
  const USER_IN_TABLE = (usermail: string, resource: string, role: string) => `//*[@col-id='userEmail' and text()='${usermail}']/following-sibling::*[@col-id='resourceTypeForUI' and text()='${resource}']/following-sibling::*[@col-id='role' and text()='${role}']`
  const USER_IN_TABLE_SERVICE = (usermail: string, resource: string, role: string) => `//*[@col-id='userEmail' and text()='${usermail}']/following-sibling::*[@col-id='resourceTypeForUI' and text()='Service']/following-sibling::*[@col-id='displayResourceName' and contains(text(), '${resource}')]/following-sibling::*[@col-id='role' and text()='${role}']`
  userToRevoke= usermail
  try {
    if ('Organization' == resource) {
        await question.assertElementExist(browser.$(USER_IN_TABLE(usermail, resource, role)))
    } else {
        await question.assertElementExist(browser.$(USER_IN_TABLE_SERVICE(usermail, resource, role)))
    }
  } catch (error) {
    global.lastError = `Either the role: ${role} was not correctly created for the specified user: ${usermail} in the resource: ${resource} or the UI is behaving inconsistently`
    throw new Error(global.lastError)
  }
  
});

When(/^the owner removes access to the user "([^"]*)" to the resource "([^"]*)" with role "([^"]*)"$/, async (user: string, resource: string, role: string) => {
  await menuhomepage.accessManagementOption()
  await accessManagement.removeAccess(user, resource, role)
});

After('@TearDownAddAccess',async() =>{
  global.lastError = "Error while doing the test teardown revoking role added to user"
  let tokenUserToRevoke = await getToken5(userToRevoke, process.env.PASSWORD)
  let userIdToRevoke = await getUserId(tokenUserToRevoke)
  let tokenMainUser = await getToken5(process.env.USERNAME, process.env.PASSWORD)
  let userId =  await getUserId(tokenMainUser)
  let data = await getTenantEffectiveRoles(userId, tokenMainUser)
  var json = Object.assign({}, data)
  let resourceId = "Organization"==asset?jp.query(json, `$..[?(@.resourceType=='Tenant')].resourceId`)[0]:jp.query(json, `$..[?(@.resourceName=='${asset}')].resourceId`)[0]
  await revokeRole(userIdToRevoke, resourceId, tokenMainUser)
});